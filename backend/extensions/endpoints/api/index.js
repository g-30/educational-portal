/** @typedef {import('/opt/homebrew/lib/node_modules/@directus/types/dist/accountability').Accountability} DirectusAccountability */
/** @typedef {import('/opt/homebrew/lib/node_modules/@directus/api/dist/services/items').ItemsService} DirectusItemsService */

const passMinLength = 8;
const studentRoleId = 'ca93cdb8-737c-4b00-9801-19f532c56746';

/** @type {DirectusItemsService } */
let ItemsService;

/** @type {(import('express').Router, { exceptions: DirectusItemsExceptionKeys }) => void} */
export default (router, { services, exceptions }) => {
	const { UsersService, AuthenticationService } = services;
	ItemsService = services.ItemsService;
	const { ServiceUnavailableException } = exceptions;

	router.post('/register', async (req, res, next) => {
		if (req.body.email == null || req.body.password == null) {
			return res.status(400).json({ status: 0, status_text: 'Please provide email & password fields.' });
		}
		const email = `${req.body.email}`.toLowerCase();
		if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email)) {
			return res.status(400).json({ status: 0, status_text: 'Email field is invalid.' });
		}
		if (`${req.body.first_name || ''}`.length < 2) {
			return res.status(400).json({ status: 0, status_text: 'First name field has to be 2 or more characters long.' });
		}
		if (`${req.body.last_name || ''}`.length < 2) {
			return res.status(400).json({ status: 0, status_text: 'Last name field has to be 2 or more characters long.' });
		}
		if (`${req.body.phone || ''}`.length < 11) {
			return res.status(400).json({ status: 0, status_text: 'Phone field has to be 11 or more characters long.' });
		}
		if (`${req.body.password}`.length < passMinLength) {
			return res.status(400).json({ status: 0, status_text: `Password should be ${passMinLength} or more characters long.` });
		}

		const usersService = new UsersService({ schema: req.schema });
		const authService = new AuthenticationService({ schema: req.schema, accountability: req.accountability });

		const payload = {
			email,
			password: req.body.password,
			role: studentRoleId,
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			phone: req.body.phone,
		};
		try {
			// await usersService.inviteUrl(email, studentRoleId, null);
			await usersService.createOne(payload);
		} catch (err) {
			return res.status(500).json({ status: 0, status_text: err.toString() });
		}

		let authData;
		try {
			authData = await authService.login('default', payload);
		} catch (err) {
			return res.status(500).json({ status: 0, status_text: err.toString() });
		}

		return res.status(201).json({ status: 1, access_token: authData.accessToken, expires: authData.expires });
	});

	router.get('/courses', (req, res, next) => {
		const coursesService = new ItemsService('courses', { schema: req.schema });

		// return res.json({services: Object.keys(services), exceptions: Object.keys(exceptions)});

		coursesService
			.readByQuery({ sort: ['id'], fields: ['*'] })
			.then((results) => res.json({
				status: 1,
				results: results.map((row) => parseCourseData(row)),
			}))
			.catch((error) => {
				return next(new ServiceUnavailableException(error.message));
			});
	});

	router.get('/courses/:id([0-9a-z-]+)', async (req, res, next) => {
		const coursesService = new ItemsService('courses', { schema: req.schema });
		const videosService = new ItemsService('videos', { schema: req.schema });

		let courseData;
		try {
			const courseId = req.params.id;
			courseData = await collectionByAliasOrId(coursesService, courseId);
		} catch (error) {
			return next(new ServiceUnavailableException(error.message));
		}

		if (courseData == null) {
			return res.status(404).json({ status: 0 });
		}

		let paymentStatus;
		let priceToPay = courseData.price;
		if (req.accountability != null && req.accountability.user != null) {
			let paymentData;
			try {
				paymentData = await coursePaymentForUserUuid(courseData.id, req.accountability.user, req);
			} catch (error) {
				return next(new ServiceUnavailableException(error.message));
			}
			if (paymentData != null) {
				paymentStatus = paymentData.status;
				priceToPay = computeCoursePayment(courseData, paymentData);
			}
		}

		let videosArray;
		try {
			videosArray = await videosService.readByQuery({ sort: ['sort'], fields: ['*'], filter: {
				course_id: { _eq: courseData.id },
				status: { _eq: 'published' },
			} });
		} catch (err) {
			return next(new ServiceUnavailableException(error.message));
		}

		res.json({
			status: 1,
			result: {
				...parseCourseData(courseData),
				payment: {
					status: paymentStatus,
					next_payment_amount: priceToPay,
				},
				videos: videosArray.map((row) => parseVideoData(row)),
			},
		});
	});

	router.get('/videos/:id([0-9a-z-]+)', async (req, res, next) => {
		const videosService = new ItemsService('videos', { schema: req.schema });

		let videoData;
		try {
			const videoId = req.params.id;
			videoData = await collectionByAliasOrId(videosService, videoId);
		} catch (error) {
			return next(new ServiceUnavailableException(error.message));
		}

		if (videoData == null || videoData.status !== 'published') {
			return res.status(404).json({ status: 0 });
		}
		const courseId = videoData['course_id'];

		let paymentStatus;
		if (req.accountability != null && req.accountability.user != null) {
			let paymentData;
			try {
				paymentData = await coursePaymentForUserUuid(courseId, req.accountability.user, req);
			} catch (error) {
				return next(new ServiceUnavailableException(error.message));
			}
			if (paymentData != null) {
				paymentStatus = paymentData.status;
			}
		}

		if (paymentStatus == null || paymentStatus !== 'paid') {
			return res.status(402).json({
				status: 0,
				status_text: 'Payment required',
				payment: {
					status: paymentStatus,
				},
			});
		}

		res.json({
			status: 1,
			result: {
				...parseVideoData(videoData),
				description: videoData['description'],
				video_iframe_url: videoData['video_iframe_url'],
			}
		});
	});

	router.post('/purchase/:course_id', async (req, res, next) => {
		/** @type {DirectusAccountability} */
		const account = req.accountability;
		if (account == null || account.user == null) {
			return res.status(401).json({ status: 0, status_text: 'User has to be authorized.' });
		}
		const userUuid = account.user;

		const coursesService = new ItemsService('courses', { schema: req.schema, accountability: req.accountability });
		let courseData;
		try {
			const courseId = req.params.course_id;
			courseData = await collectionByAliasOrId(coursesService, courseId);
		} catch (error) {
			return next(new ServiceUnavailableException(error.message));
		}

		let paymentData;
		try {
			paymentData = await coursePaymentForUserUuid(courseData.id, userUuid, req);
		} catch (error) {
			return next(new ServiceUnavailableException(error.message));
		}

		if (paymentData != null && paymentData.status === 'paid') {
			return res.status(500).json({ status: 0, status_text: 'Course is already paid' });
		}
		const priceToPay = computeCoursePayment(courseData, paymentData);
		if (paymentData == null) {
			try {
				const paymentsService = new ItemsService('payments', { schema: req.schema, accountability: req.accountability });
				await paymentsService.createOne({
					status: 'requested',
					student_user_id: userUuid,
					course_id: courseData.id,
				});
			} catch (error) {
				return next(new ServiceUnavailableException(error.message));
			}
		}

		const httpStatus = paymentData == null ? 201 : 200;
		res.status(httpStatus).json({
			status: 1,
			result: {
				price_to_pay: priceToPay,
			},
		});
	});
};

function computeCoursePayment(courseData, paymentData) {
	if (paymentData != null && paymentData.status === 'paid') {
		return 0;
	}
	let priceToPay = courseData.price;
	if (courseData.downpayment_percentage != null && (paymentData == null || paymentData.status !== 'prepaid')) {
		priceToPay *= courseData.downpayment_percentage / 100;
	} else {
		priceToPay -= courseData.price * (courseData.downpayment_percentage || 0) / 100;
	}
	return priceToPay;
}

async function coursePaymentForUserUuid(courseId, userUuid, req) {
	/** @type {DirectusItemsService} */
	const paymentsService = new ItemsService('payments', { schema: req.schema, accountability: req.accountability });
	const query = await paymentsService.readByQuery({ fields: ['*'], filter: {
		course_id: { _eq: courseId },
		student_user_id: { _eq: userUuid },
	} });
	return query[0] || null;
}

/** @param {string | number} itemId */
async function collectionByAliasOrId(service, itemId) {
	let res;
	if (Number.isNaN(+itemId)) {
		const query = await service.readByQuery({ fields: ['*'], filter: { alias: { _eq: itemId } } });
		res = query[0];
	} else {
		res = await service.readOne(itemId);
	}
	return res;
}

function parseCourseData(row) {
	return {
		id: row['id'],
		alias: row['alias'],
		name: row['name'],
		price: row['price'],
		preview_url: row['preview_url'],
		videos_count: Array.from(row['videos']).length,
	};
}

function parseVideoData(row) {
	return {
		id: row['id'],
		alias: row['alias'],
		name: row['name'],
		preview_url: row['preview_url'],
	};
}

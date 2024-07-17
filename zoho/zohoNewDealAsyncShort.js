function zohoNewDeal(formid, productID, productName, appLink){
	var output = false;
	form = $(formid);
	form.addClass('loading');
	form.find('input.name').focus();
	form.find('input.email').focus();
	form.find('input.phone').focus();
	form.find('input[type="submit"]').focus();
	form.find('button[type="submit"]').focus();
	var name = form.find('input.name').val();
	var email = form.find('input.email').val();
	var phone = form.find('input.phone').val();
	var utm_source = getUrlParameter('utm_source');
	var utm_medium = getUrlParameter('utm_medium');
	var utm_term = getUrlParameter('utm_term');
	var utm_campaign = getUrlParameter('utm_campaign');
	var utm_content = getUrlParameter('utm_content');
	var clientID = getCookie("_ga").split('.')[2] + '.' + getCookie("_ga").split('.')[3];
	var http_refferer = window.location.href.split('?')[0];
	var countPlus = (phone.match(/\+/g) || []).length;
	if(countPlus > 1) {
		form.find('input.phone').removeClass('not_error').addClass('error');
		console.log('test');
	}
	phone = phone.replace(/\s/g, '');
	$(".last1").val(phone);

	var url = window.location.href;

	if ($('.not_error').length == 3)
	{

		setCookie('name', name, 365);
		setCookie('email', email, 365);
		setCookie('phone', phone, 365);

		// Facebook pixel tracking
		if(typeof fbq !== "undefined"){
			fbq('track', 'Lead');
			console.log('fb-pixel-done');
		}
		else{
			console.log('fb-pixel-none!!!')
		}

		// TikTok pixel tracking
		if(typeof ttq !== "undefined"){
			ttq.track('SubmitForm')
			console.log('tiktok-pixel-done');
		}
		else{
			console.log('tiktok-pixel-none!!!')
		}

		// Google analyticks tracking
		if(typeof dataLayer !== "undefined"){
			dataLayer.push({'event': 'lead_form_submit'});
			console.log('dataLayer-push-done');
		}
		else{
			console.log('dataLayer-push-none!!!')
		}

		// добавление в гугл таблицу
		if(appLink) {
			$.ajax({
				type: "POST",
				url: appLink,
				async: true,
				data: {
					Имя: name,
					Email: email,
					Телефон: phone,
					Url: url,
				},
				success: function (data)
				{
					console.log('google spreadsheet success');
				}
			});
		}

		$.ajax({
			type: "POST",
			url: 'https://pay.genius.space/deal',
			async: false,
			data:
			{
				First_Name: name,
				Email: email,
				Phone: phone,
				productName: productName,
				productID: productID,
				utm_source: utm_source,
				utm_medium: utm_medium,
				utm_term: utm_term,
				utm_campaign: utm_campaign,
				utm_content: utm_content,
				clientID: clientID,
				http_refferer: http_refferer,
				Product_type: 'Лид магнит',
				Stage: '1. Заявка'
			},
			success: function(res)
			{
				console.log('success');
				output = true;
				return output;
			},
			error: function(res)
			{
				console.log('error');
				output = true;
				return output;
			}
		});
	}
	else
	{
		form.removeClass('loading');
		form.find('input.error').first().focus();
		return output;
	}
};

function sendGR(formid, appLink) {
	var output = false;
	form = $(formid);
	form.addClass('loading');
	form.find('input[name="name"]').focus();
	form.find('input[name="email"]').focus();
	form.find('input[name="phone"]').focus();
	form.find('button[type="submit"]').focus();
	var name = form.find('input.name').val();
	var email = form.find('input.email').val();
	var phone = form.find('input.phone').val() || '';
	var url = window.location.href;
	var utm_source = getUrlParameter('utm_source');
	var utm_medium = getUrlParameter('utm_medium');
	var utm_term = getUrlParameter('utm_term');
	var utm_campaign = getUrlParameter('utm_campaign');
	var utm_content = getUrlParameter('utm_content');

	if(form.find('.error').length > 0) {
		form.find('input.error').first().focus();
		form.removeClass('loading');
	} else {
		$.ajax({
			type: "POST",
			url: appLink,
			async: false,
			data: {
				Имя: name,
				Email: email,
				Телефон: phone,
				Url: url,
				utm_source: utm_source,
				utm_medium: utm_medium,
				utm_term: utm_term,
				utm_campaign: utm_campaign,
				utm_content: utm_content,
			},
			success: function (data) {
				setCookie('name', name, 365);
				setCookie('email', email, 365);
				console.log('google spreadsheet success');
			}
		});

		if(typeof fbq !== "undefined"){
			fbq('track', 'Lead');
			console.log('fb-pixel-done');
		}
		else{
			console.log('fb-pixel-none!!!')
		}
		output = true;
	}

	// if ($('.not_error').length >= 2){
		
	// }
	// else{
	// 	form.find('input.error').first().focus();
	// 	form.removeClass('loading');
	// }
	return output;
};

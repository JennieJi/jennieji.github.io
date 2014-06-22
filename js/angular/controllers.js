var mySiteModule = angular.module('mySite', []);

/*
 * Work Controller
 */
mySiteModule.controller('controllerWork', function($scope) { 
	$scope.works = [{
		"groupTitle": "jQuery Plugins",
		"groupItems": [
			{
				"subject": "jquery-bannerRotator",
				"description": "A simple banner rotator created long time ago.",
				"links": [
					{
						"text": "Demo",
						"url": "http://jennieji.github.io/jquery-bannerRotator",
						"altText": "demo of bannerRotator"
					},{
						"text": "Source Code",
						"url": "https://github.com/JennieJi/jquery-bannerRotator",
						"altText":  "source code of bannerRotator"
					}
				]
			}, {
				"subject": "jquery-imgSlideInput",
				"description": "An image slider binding with input. This can be used in some special forms.",
				"links": [
					{
						"text": "Demo",
						"url": "http://jennieji.github.io/jquery-imgSlideInput",
						"altText": "demo of imgSlideInput"
					},{
						"text": "Source Code",
						"url": "https://github.com/JennieJi/jquery-imgSlideInput",
						"altText":  "source code of imgSlideInput"
					}
				]
			}, {
				"subject": "jquery-niceSelect",
				"description": "Customize the select by jQuery.",
				"links": [
					{
						"text": "Demo",
						"url": "http://jennieji.github.io/jquery-niceSelect",
						"altText": "demo of niceSelect"
					},{
						"text": "Source Code",
						"url": "https://github.com/JennieJi/jquery-niceSelect",
						"altText":  "source code of niceSelect"
					}
				]
			}
		]
	}, {
		"groupTitle": "Tools",
		"groupItems": [
			{
				"subject": "subIPv6",
				"description": "IPv6 subnet range calculator",
				"links": [
					{
						"text": "Try it!",
						"url": "http://jennieji.github.io/subipv6",
						"altText": "demo of subIPv6"
					},{
						"text": "Source Code",
						"url": "https://github.com/JennieJi/subipv6",
						"altText":  "source code of subIPv6"
					}
				]
			}
		]
	}, {
		"groupTitle": "Demos",
		"groupItems": [
			{
				"subject": "jquery-jigsaw",
				"description": "A simple way to create a jigsaw using jQuery UI.",
				"links": [
					{
						"text": "Demo",
						"url": "http://jennieji.github.io/jquery-jigsaw",
						"altText": "demo of jigsaw"
					},{
						"text": "Source Code",
						"url": "https://github.com/JennieJi/jquery-jigsaw",
						"altText":  "source code of jigsaw"
					}
				]
			}, {
				"subject": "node-todo-demo",
				"description": "A very simple MVC todo demo created by Node.js ( express + ejs + mongoose ).",
				"links": [
					{
						"text": "Source Code",
						"url": "https://github.com/JennieJi/node-todo-demo",
						"altText":  "source code of node-todo-demo"
					}
				]
			}
		]
	}];
});   

/*
 * SNS Controller
 */
mySiteModule.controller('controllerSns', function($scope) { 
	$scope.sns = [
		{
			"name": "linkedin",
			"altText": "Linkedin",
			"url": "http://cn.linkedin.com/in/jennieji/"
		}, {
			"name": "flickr",
			"altText": "Flickr",
			"url": "https://www.flickr.com/photos/jennieji/"
		}, {
			"name": "twitter",
			"altText": "Twitter",
			"url": "https://twitter.com/jyee721"
		}
	];
});          
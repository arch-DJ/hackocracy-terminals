/*This a file which contains all the library data */
'use strict'

exports.getTag = function(callback){
/*An array of all the tags you can add more day by day*/
	var tags = [
		"education",
		"water-supply"
		"electric-supply",
		"crime",
		"Congestion",
		"Unemployment",
		"Sewerage Problems",
		"Transport",
		"Urban Sprawl",
	]
	callback({"data":tags});
}

exports.getMinistry = function(callback){
	/*List of all ministry in india */
	var ministry = [
		"Ministry of Agriculture and Farmers Welfare",
		"Ministry of AYUSH",
		"Ministry of Chemicals and Fertilizers",
		"Ministry of Civil Aviation",
		"Ministry of Coal",
		"Ministry of Commerce and Industry",
		"Ministry of Communications",
		"Ministry of Consumer Affairs, Food and Public Distribution",
		"Ministry of Corporate Affairs",
		"Ministry of Culture",
		"Ministry of Defence",
		"Ministry of Development of North Eastern Region",
		"Ministry of Drinking Water and Sanitation",
		"Ministry of Earth Sciences",
		"Ministry of Electronics and Information Technology",
		"Ministry of Environment, Forest and Climate Change",
		"Ministry of External Affairs",
		"Ministry of Finance",
		"Ministry of Food Processing Industries",
		"Ministry of Health and Family Welfare",
		"Ministry of Heavy Industries and Public Enterprises",
		"Ministry of Home Affairs",
		"Ministry of Housing and Urban Poverty Alleviation",
		"Ministry of Human Resource Development"
	]
	callback({"data":ministry});
}
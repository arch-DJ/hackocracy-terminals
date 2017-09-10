/*This a file which contains all the library data */
'use strict'

exports.getTag = function(callback){
/*An array of all the tags you can add more day by day*/
	var tags = [
		"education",
		"water-supply",
		"electric-supply",
		"crime",
		"Congestion",
		"Unemployment",
		"Sewerage Problems",
		"Transport",
		"Urban Sprawl",
	];
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
	];
	var website = [
	    "agriculture.gov.in/",
	    "ayush.gov.in/",
	    "chemicals.nic.in/",
	    "www.civilaviation.gov.in/",
	    "www.coal.nic.in/",
	    "commerce.gov.in/",
	    "www.dot.gov.in/",
	    "consumeraffairs.nic.in/home.aspx",
	    "www.mca.gov.in/",
	    "www.indiaculture.nic.in/",
	    "mod.nic.in/",
	    "www.mdoner.gov.in/",
	    "www.mdws.gov.in/",
	    "www.moes.gov.in/",
	    "meity.gov.in/",
	    "envfor.nic.in/",
	    "www.mea.gov.in/",
	    "finmin.nic.in/",
	    "mofpi.nic.in/",
	    "mohfw.nic.in/",
	    "dhi.nic.in/",
	    "mha.nic.in/",
	    "mhupa.gov.in/",
	    "mhrd.gov.in/"
	]
	callback({"data":tags,"data1":ministry,"data2":website});
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

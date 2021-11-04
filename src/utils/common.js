/**
 * 时间戳转换成yyyy-mm-dd时间
 * @param {Sting} dateTime 时间戳 
 * @param {Sting} fmt 转换格式 非必填
 */
export const timeFormat = (dateTime = null, fmt = 'yyyy-mm-dd') => {
	// 如果为null,则格式化当前时间
	if (!dateTime) dateTime = Number(new Date());
	// 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
	if (dateTime.toString().length == 10) dateTime *= 1000;
	let date = new Date(dateTime);
	let ret;
	let opt = {
		"y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"h+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"s+": date.getSeconds().toString() // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

/**
 * @param {sting} date yyy-mmm-ddd
 * @param {Boolean} humanized 人性化,返回今天、明天、后天  
 * 根据日期计算星期几 格式为 yyy-mmm-ddd
 */
export const weekDay = (date, humanized = false) => {
	if (date) {
		let temp = date
		var dt = new Date(date.split("-")[0], date.split("-")[1] - 1, date = date.split("-")[2]);
		var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
		if (humanized) {
			if (isToday(temp))
				return '今天'
			if (isTomorrow(temp))
				return '明天'
			return weekDay[dt.getDay()];
		}
		return weekDay[dt.getDay()];
	}
}

/**
 * @param {Object} date
 * 获取当前日期的下一个月日期
 */
export const getNextMonth = (date, ) => {
	var arr = date.split('-');
	var year = arr[0]; //获取当前日期的年份
	var month = arr[1]; //获取当前日期的月份
	var day = arr[2]; //获取当前日期的日
	var days = new Date(year, month, 0);
	days = days.getDate(); //获取当前日期中的月的天数
	var year2 = year;
	//下一个月
	// var month2 = parseInt(month) + 1;
	//下两个月
	var month2 = parseInt(month) + 2;
	if (month2 == 13) {
		year2 = parseInt(year2) + 1;
		month2 = 1;
	}
	var day2 = day;
	var days2 = new Date(year2, month2, 0);
	days2 = days2.getDate();
	if (day2 > days2) {
		day2 = days2;
	}
	if (month2 < 10) {
		month2 = '0' + month2;
	}

	var t2 = year2 + '-' + month2 + '-' + day2;
	return t2;
}
/**
 * 计算n天后的日期
 * @param {Object} initDate 开始日期，默认为当天日期， 格式：yyyymmdd/yyyy-mm-dd
 * @param {Object} days 天数
 * @param {Object} flag 返回值， 年与日之间的分隔符， 默认为xxxx年xx月xx日格式
 */
export const getDateAfter_n = (initDate, days, flag) => {
	function trim(str) {
		return str.replace(/^\s*|\s*$/g, "");
	}
	if (!days) {
		return initDate;
	}
	initDate = initDate.replace(/-/g, '');
	flag = trim(flag);
	var date;
	// 是否设置了起始日期
	if (!trim(initDate)) { // 没有设置初始化日期，就默认为当前日期
		date = new Date();
	} else {
		var year = initDate.substring(0, 4);
		var month = initDate.substring(4, 6);
		var day = initDate.substring(6, 8);
		date = new Date(year, month - 1, day); // 月份是从0开始的
	}
	date.setDate(date.getDate() + days);

	var yearStr = date.getFullYear();
	var monthStr = ("0" + (date.getMonth() + 1)).slice(-2, 8); // 拼接2位数月份
	var dayStr = ("0" + date.getDate()).slice(-2, 8); // 拼接2位数日期
	var result = "";
	if (!flag) {
		result = yearStr + "年" + monthStr + "月" + dayStr + "日";
	} else {
		result = yearStr + flag + monthStr + flag + dayStr
	}
	return result;
}
/**
 * 判断是否是今天
 * @param {string} date 支持传入时间戳和/yyyy-mm-dd  
 */
export const isToday = (date) => {
	//获取当前凌晨的时间戳
	const now = new Date(new Date())
	now.setHours(0, 0, 0, 0)
	//获取传入时间凌晨的时间戳
	const dateTime = new Date(date)
	dateTime.setHours(0, 0, 0, 0)
	const diff = dateTime.getTime() - now.getTime()
	if (diff >= 0 && diff < 86400000) {
		return true
	}
	return false
}
/**
 * 判断是否是明天
 * @param {string} date 支持传入时间戳和/yyyy-mm-dd  
 */
export const isTomorrow = (date) => {
	//获取当前凌晨的时间戳
	const now = new Date(new Date())
	now.setHours(0, 0, 0, 0)
	//获取传入时间凌晨的时间戳
	const dateTime = new Date(date)
	dateTime.setHours(0, 0, 0, 0)
	const diff = dateTime.getTime() - now.getTime()
	if (diff >= 86400000 && diff < 172800000) {
		return true
	}
	return false
}

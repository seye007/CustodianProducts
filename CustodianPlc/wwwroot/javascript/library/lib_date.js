/**
 * @description To handle date related operations
 * @description : context - { isDate } Method
 * - Check for day against the total number of days of a month putting
 * - leap year into consideration in the
 * 
 * @param {None}
 * 
 * @dependencies {LibCore}
 *   
 * 
*/

function LIB_DATE() {
  
  var allowedFormats = ['YMD', 'YDM', 'MYD', 'MDY', 'DMY', 'DYM'];
  var allowedDelimeters = ['-', '/'];
  var config = {delimeter: '-', format: 'YMD'}
  var months = [
    { name: 'January', abbrev: 'Jan', index: 1, days: 31},
    { name: 'February', abbrev: 'Feb', index: 2, days: 28},
    { name: 'March', abbrev: 'Mar', index: 3, days: 31},
    { name: 'April', abbrev: 'Apr', index: 4, days: 30},
    { name: 'May', abbrev: 'May', index: 5, days: 31},
    { name: 'June', abbrev: 'Jun', index: 6, days: 30},
    { name: 'July', abbrev: 'Jul', index: 7, days: 31},
    { name: 'August', abbrev: 'Aug', index: 8, days: 31},
    { name: 'September', abbrev: 'Sept', index: 9, days: 30},
    { name: 'October', abbrev: 'Oct', index: 10, days: 31},
    { name: 'November', abbrev: 'Nov', index: 11, days: 30},
    { name: 'Decemeber', abbrev: 'Dec', index: 12, days: 31}
  ];

  /** 
   * @description
   * To check if date is valid in terms of month, day and year numbers
   * 
   * @param {dateString}
   * 
   * @returns {Boolean}
   * 
  */
 
  this.isDate = function (dateString) {
    var self = this;
    var date = self.toObject(dateString);
    return (
      date !== null
      && date.month >= 1
      && date.month <= 12
      && date.day >= 1
      && date.day <= 31
    )
  }

  /** 
   * @description To get the current date from local machine
   * 
   * @param {None}
   * 
   * @returns {DateObject}
   * 
  */

  this.now = function () {
    var dateObj = new Date(); 
    var day = dateObj.getDate();
    var month = dateObj.getMonth() + 1;
    var year =  dateObj.getFullYear();
    return {
      day: day,
      month: month,
      year: year
    };
  }
  
  /** 
   * @description To convert date object to string
   * 
   * @param {DateObject}
   * 
   * @returns {String}
   * 
  */

  this.toString = function (dateObj) {
    var self = this;
    var dayIndex = LibCore.getFirstIndex(config.format, 'D');
    var monthIndex = LibCore.getFirstIndex(config.format, 'M');
    var yearIndex = LibCore.getFirstIndex(config.format, 'Y');
    var i;
    var dateString = '';
    for (i=0; i<3; i++) {
      if (i === dayIndex) dateString += self.zeroPad(dateObj.day, 2);
      else if (i === monthIndex) dateString += self.zeroPad(dateObj.month, 2);
      else if (i === yearIndex) dateString += self.zeroPad(dateObj.year, 4);
      if ( i<2 ) {
        dateString += config.delimeter;
      }
    }
    return dateString;

  }
  
   /** 
   * @description To convert date string to object
   * 
   * @param {DateString}
   * 
   * @returns {DateObject | null}
   * 
  */

  this.toObject = function (dateString) {
    if (!LibCore.isString(dateString)) return null;
    var dateArray = dateString.split(config.delimeter);
    if (
      !LibCore.isArray(dateArray)
      || dateArray.length !== 3
      || !LibCore.isIntegerArray(dateArray)
    ) return null;

    var dayIndex = LibCore.getFirstIndex(config.format, 'D');
    var monthIndex = LibCore.getFirstIndex(config.format, 'M');
    var yearIndex = LibCore.getFirstIndex(config.format, 'Y');

    return {
      day: parseInt(dateArray[dayIndex], 10),
      month: parseInt(dateArray[monthIndex]),
      year: parseInt(dateArray[yearIndex]),
    }

  }

  /** 
   * @description To add zeros before month and day in presentation
   * 
   * @param {argument} - Either the day or month number
   * @param {minChars} - To decide when to add zeros and number of zeros to add
   * 
   * @returns {String}
   * 
  */

  this.zeroPad = function (argument, minChars) {
    if (!LibCore.isPlain(argument) || !LibCore.isInteger(minChars)) return '';
    argument = `${argument}`;
    minChars = parseInt(minChars, 10);

    if (argument.length >= minChars) return argument;
    var zeros = LibCore.duplicateCharacter('0', minChars - argument.length);
    return `${zeros}${argument}`;
  }

  /** 
   * @description
   * To get the month object that contains the days, index, name 
   * and others as specified in the months array above
   * 
   * @param {month} - Month number, name or abbreviation
   * 
   * @returns {Object | null}
   * 
  */
 
  this.getMonthObject = function (month) {
    var self = this;
    var itemIndex, item;
    for (itemIndex in months) {
      var monthObj = months[itemIndex];
      if (
        (
          LibCore.isString(month) && (
            monthObj.name.toLowerCase() === month.toLowerCase()
            || monthObj.abbrev.toLowerCase() === month.toLowerCase()
          )
        )
        || (
          LibCore.isInteger(month)
          && monthObj.index === parseInt(month, 10)
        )
      ) return monthObj;
    }
    return null;
  }

  /** 
   * @description To get month days considering leap year for february
   * 
   * @param {month} - Month number, name or abbreviation
   * @param {year}
   * 
   * @returns {Integer | null}
   * 
  */

  this.getDays = function (month, year) {
    var self = this;
    var month  = self.getMonthObject(month);
    if (month === null) return null;
    var days = month.days;
    if (
      month.index === 2
      && LibCore.isInteger(year)
      && self.isLeapYear(parseInt(year))
    ) return days + 1;
    return days;
  }

  /** 
   * @description Get month number from a date string
   * 
   * @param {dateString}
   * 
   * @returns {Integer | null}
   * 
  */ 

  this.reverse = function (dateString) {
    var self = this;
    var result = self.toObject(dateString);
    var format = config.format;
    config.format = 'DMY';
    result = result === null ? null : self.toString(result);
    config.format = format;
    return result;
  }

  /** 
   * @description Get month number from a date string
   * 
   * @param {dateString}
   * 
   * @returns {Integer | null}
   * 
  */

  this.extractMonth = function (dateString) {
    var self = this;
    var result = self.toObject(dateString);
    return result !== null ? result.month : null;
  }

  /** 
   * @description Get day number from a date string
   * 
   * @param {dateString}
   * 
   * @returns {Integer | null}
   * 
  */

  this.extractDay = function (dateString) {
    var self = this;
    var result = self.toObject(dateString);
    return result !== null ? result.day : null;
  }

  /** 
   * @description Get year number from a date string
   * 
   * @param {dateString}
   * 
   * @returns {Integer | null}
   * 
  */

  this.extractYear = function (dateString) {
    var self = this;
    var result = self.toObject(dateString);
    return result !== null ? result.year : null;
  }

  /** 
   * @description To check if format specified is supported by date library
   * 
   * @param {format} - Format to check for in the { allowedFormats } array
   * 
   * @returns {Boolean}
   * 
  */

  this.isFormat = function (format) {
    return (
      LibCore.isString(format)
      && LibCore.inArray(
        allowedFormats,
        format.toUpperCase()
      )
    );
  }

  /** 
   * @description To set config format to verified format provided
   * 
   * @param {format} - Format to set in config object
   * 
   * @returns {Boolean}
   * 
  */

  this.setFormat = function (format) {
    var self = this;
    if (self.isFormat(format)) {
      config.format = format.toUpperCase();
      return true;
    }
    return false;
  }

  /** 
   * @description To check if delimeter specified is supported by date library
   * 
   * @param {delimeter} - Delimeter to check for in the { allowedDelimeters } array
   * 
   * @returns {Boolean}
   * 
  */

  this.isDelimeter = function (delimeter) {
    return (
      LibCore.isString(delimeter)
      && LibCore.inArray(
        allowedDelimeters,
        delimeter
      )
    );
  }

  /** 
   * @description To set config delimeter to verified deliemeter provided
   * 
   * @param {delimeter} - Delimeter to set in config object
   * 
   * @returns {Boolean}
   * 
  */

  this.setDelimeter = function (delimeter) {
    var self = this;
    if (self.isDelimeter(delimeter)){
      config.delimeter = delimeter
      return true;
    }
    return false;
  }

  /** 
   * @description To set config object after content verification
   * 
   * @param {format}    - Format to set in config
   * @param {delimeter} - Delimeter to set in config object
   * 
   * @returns {Boolean}
   * 
  */

  this.setConfig = function (format, delimeter) {
    var self = this;
    if (
      self.isFormat(format)
      && self.isDelimeter(delimeter)
    ) {
      config.format = format;
      config.delimeter = delimeter;
      return true;
    }
    return false;
  }

  /** 
   * @description To return the age from date of birth with respect to present date
   * 
   * @param {dob} - Just the date of birth 
   * 
   * @returns {Integer | null}
   * 
  */

  this.toAge = function (dob) {
    var self = this;
    var presentYear = self.now().year;
    var dobYear = self.extractYear(dob);
    return (dobYear <= presentYear) ? (presentYear - dobYear) : null;
  }

  /** 
   * @description
   * To check for when date falls { Past | Present | Future }
   * with respect to a reference date which defaults to present date
   * 
   * @param {dateString}
   * @param {refDateString}
   * 
   * @returns { 0 | -1 | 1 | null }
   * 
  */

  this.getDateState = function (dateString, refDateString) {
    var self = this;
    var date = self.toObject(dateString);
    var reference = refDateString !== undefined ? self.toObject(refDateString) : self.now();
    if (date === null || reference === null) return null;
    if (date.year > reference.year) return 1;
    else if (date.year < reference.year) return -1;
    else if (date.month > reference.month) return 1;
    else if (date.month < reference.month) return -1;
    else if (date.day > reference.day) return 1;
    else if (date.day < reference.day) return -1;
    return 0;
  }

  /** 
   * @description To check if date falls in { Past }
   * 
   * @param {dateString}
   * @param {refDateString}
   * 
   * @returns { Boolean | null }
   * 
  */

  this.isPast = function (dateString, refDateString) {
    var self = this;
    var status = self.getDateState(dateString, refDateString);
    if (status === null) return null;
    return status === -1;
  }

  /** 
   * @description To check if date falls in { Present }
   * 
   * @param {dateString}
   * @param {refDateString}
   * 
   * @returns { Boolean | null }
   * 
  */

  this.isPresent = function (dateString, refDateString) {
    var self = this;
    var status = self.getDateState(dateString, refDateString);
    if (status === null) return null;
    return status === 0;
  }

  /** 
   * @description To check if date falls in { Future }
   * 
   * @param {dateString}
   * @param {refDateString}
   * 
   * @returns { Boolean | null }
   * 
  */

  this.isFuture = function (dateString, refDateString) {
    var self = this;
    var status = self.getDateState(dateString, refDateString);
    if (status === null) return null;
    return status === 1;
  }

  /** 
   * @description Formula to check if a year is a leap year
   * 
   * @param {year}
   * 
   * @returns { Boolean | null }
   * 
  */

  this.isLeapYear = function (year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }

  /** 
   * @description To get the number of days in a month before the supplied date
   * 
   * @param {dateString}
   * 
   * @returns { Integer | null }
   * 
  */

  this.numOfDaysBeforeDate = function (dateString) {
    var self = this;
    if (!self.isDate(dateString)) return null;
    var date = self.toObject(dateString);
    if (date === null) return null;
    return date.day - 1;
  }

  /** 
   * @description To get the number of days after the supplied date to the end of the month
   * 
   * @param {dateString}
   * 
   * @returns { Integer | null }
   * 
  */

  this.numOfDaysAfterDate = function (dateString) {
    var self = this;
    if (!self.isDate(dateString)) return null;
    var date = self.toObject(dateString);
    if (date === null) return null;
    var totalDays = self.getDays(date.month);
    if (totalDays === null) return null;
    return Math.abs(totalDays - date.day);
  }

  /** 
   * @description To get the date that comes first
   * 
   * @param {dateString}
   * @param {refDateString}
   * 
   * @returns {String}
   * 
  */

  this.getEarlierDate = function (dateString, refDateString) {
    var self = this;
    var status = self.isPast(dateString, refDateString);
    if (status === null) return null;
    if (dateString === refDateString) return dateString;
    return status ? dateString : refDateString;
  }

  /** 
   * @description Order dates in terms of earlier dat
   * 
   * @param {dateString}
   * @param {refDateString}
   * 
   * @returns {Object} - With attributes {start | end}
   * 
  */

  /*********************************************************/
  /** 
   * @description A list of methods for calculating period
   * 
   * @returns {Object}
   * 
  */
  /*********************************************************/

  this.getOrderedDates = function (dateString, refDateString) {
    var self = this;
    var startDateString = self.getEarlierDate(dateString, refDateString);
    if (startDateString === null) return null;
    var endDateString = (startDateString === dateString) ? refDateString : dateString;
    return {
      start: startDateString,
      end: endDateString
    }
  }

  this.resolveDateSum = function (daysToMonthEnd, daysToMonthBegin) {
    var mainMonthsDiff = 0;
    var mainDaysDiff = 0;
    var totalDays = daysToMonthEnd + daysToMonthBegin;
    if (totalDays >= 31) {
      mainMonthsDiff = parseInt(totalDays / 31);
      totalDays = totalDays % 31;
    }
    mainDaysDiff = totalDays;
    return {
      months: mainMonthsDiff,
      days: mainDaysDiff
    }
  }

  this.getPeriodInSameYear = function (startObj, endObj, ordered) {
    var self = this;

    var mainYearsDiff = 0;
    var monthsDiff = Math.abs(endObj.month - startObj.month);
    var mainMonthsDiff = monthsDiff > 0 ? monthsDiff - 1 : 0;

    if (monthsDiff === 0) {
      var mainDaysDiff = endObj.day - startObj.day;
    } else {
      var resolve = self.resolveDateSum(
        self.numOfDaysAfterDate(ordered.start),
        endObj.day
      );
      var mainDaysDiff = resolve.days;
      mainMonthsDiff += resolve.months;
      if (mainMonthsDiff >= 12) {
        mainYearsDiff += parseInt(mainMonthsDiff / 12);
        mainMonthsDiff = mainMonthsDiff % 12;
      }

    }

    return {
      years: mainYearsDiff,
      months: mainMonthsDiff,
      days: mainDaysDiff
    }
  }

  this.getPeriodInDiffYears = function (startObj, endObj, ordered) {
    var self = this;
    var mainYearsDiff = 0;

    var monthToYearEnd = 12  - startObj.month;
    var monthToYearStart = endObj.month - 1;
    var monthsInBtw = monthToYearEnd + monthToYearStart;
    if (monthsInBtw >= 12) {
      mainYearsDiff += parseInt(monthsInBtw / 12);
      monthsInBtw = monthsInBtw % 12;
    }
    var mainMonthsDiff = monthsInBtw;
    var resolve = self.resolveDateSum(
      self.numOfDaysAfterDate(ordered.start),
      endObj.day
    );
    var mainDaysDiff = resolve.days;
    mainMonthsDiff += resolve.months;
    if (mainMonthsDiff >= 12) {
      mainYearsDiff += parseInt(mainMonthsDiff / 12);
      mainMonthsDiff = mainMonthsDiff % 12;
    }

    return {
      years: mainYearsDiff,
      months: mainMonthsDiff,
      days: mainDaysDiff
    }

  }

  this.getPeriod = function (dateString, refDateString) {
    var self = this;
    var ordered = self.getOrderedDates(dateString, refDateString);
    if (ordered === null) return null;

    var startObj = self.toObject(ordered.start);
    var endObj = self.toObject(ordered.end);

    var yearsDiff = Math.abs(endObj.year - startObj.year);
    var mainYearsDiff = yearsDiff > 0 ? yearsDiff - 1 : 0;

    if (yearsDiff === 0) {
      var result = self.getPeriodInSameYear(startObj, endObj, ordered);
      mainYearsDiff += result.years;
      var mainMonthsDiff = result.months;
      var mainDaysDiff = result.days;
    }
    else {
      var result = self.getPeriodInDiffYears(startObj, endObj, ordered);
      mainYearsDiff += result.years;
      var mainMonthsDiff = result.months;
      var mainDaysDiff = result.days;
    }

    return {
      years: mainYearsDiff,
      months: mainMonthsDiff,
      days: mainDaysDiff
    }

  }

}

LibDate = null;
try { LibDate = LibCore ? new LIB_DATE() : null; }
catch (e) { console.log ("Object [ LibCore ] is required"); }
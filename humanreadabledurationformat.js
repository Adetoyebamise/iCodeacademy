/**
 * DESCRIPTION:
Your task in order to complete this Kata is to write a function which formats a duration, given as a number of seconds, in a human-friendly way.

The function must accept a non-negative integer. If it is zero, it just returns "now". Otherwise, the duration is expressed as a combination of years, days, hours, minutes and seconds.

It is much easier to understand with an example:

* For seconds = 62, your function should return 
    "1 minute and 2 seconds"
* For seconds = 3662, your function should return
    "1 hour, 1 minute and 2 seconds"
For the purpose of this Kata, a year is 365 days and a day is 24 hours.

Note that spaces are important.

Detailed rules
The resulting expression is made of components like 4 seconds, 1 year, etc. In general, a positive integer and one of the valid units of time, separated by a space. The unit of time is used in plural if the integer is greater than 1.

The components are separated by a comma and a space (", "). Except the last component, which is separated by " and ", just like it would be written in English.

A more significant units of time will occur before than a least significant one. Therefore, 1 second and 1 year is not correct, but 1 year and 1 second is.

Different components have different unit of times. So there is not repeated units like in 5 seconds and 1 second.

A component will not appear at all if its value happens to be zero. Hence, 1 minute and 0 seconds is not valid, but it should be just 1 minute.

A unit of time must be used "as much as possible". It means that the function should not return 61 seconds, but 1 minute and 1 second instead. Formally, the duration specified by of a component must not be greater than any valid more significant unit of time.

 */

function formatDuration(seconds) {
  var time = { year: 31536000, day: 86400, hour: 3600, minute: 60, second: 1 },
    res = [];

  if (seconds === 0) return "now";

  for (var key in time) {
    if (seconds >= time[key]) {
      var val = Math.floor(seconds / time[key]);
      res.push((val += val > 1 ? " " + key + "s" : " " + key));
      seconds = seconds % time[key];
    }
  }

  return res.length > 1
    ? res.join(", ").replace(/,([^,]*)$/, " and" + "$1")
    : res[0];
}


function formatDuration (seconds) {
  if(!seconds)return "now";
  var strout = "";
  var s = seconds%60;
  seconds = (seconds-s)/60;
  var m = seconds%60;
  seconds = (seconds-m)/60;
  var h = seconds%24;
  seconds = (seconds-h)/24;
  var d = seconds%365;
  seconds = (seconds-d)/365;
  var y = seconds;
  
  var english=[];
  if(y)english.push(y+" year"+(y>1?'s':''));
  if(d)english.push(d+" day"+(d>1?'s':''));
  if(h)english.push(h+" hour"+(h>1?'s':''));
  if(m)english.push(m+" minute"+(m>1?'s':''));
  if(s)english.push(s+" second"+(s>1?'s':''));
  
  return english.join(", ").replace(/,([^,]*)$/," and$1");
  
}

var formatDuration = (function () {

  return function formatDuration (seconds) {
    return [{name: 'year',   size: 365 * 24 * 60 * 60 * 1},
            {name: 'day',    size:       24 * 60 * 60 * 1},
            {name: 'hour',   size:            60 * 60 * 1},
            {name: 'minute', size:                 60 * 1},
            {name: 'second', size:                      1}].
            reduce(parse, { parts: [], seconds: seconds }).
            parts.
            reduce(join, 'now');
  };
  
  function parse (result, part) {
    var quantity = Math.floor(result.seconds / part.size);
    if (quantity > 0) {
      result.seconds -= quantity * part.size;
      result.parts.push(quantity + ' ' + part.name + (quantity == 1 ? '' : 's'));
    }
    return result;
  }
  
  function join (result, part, index, arr) {
    switch (index) {
      case 0: return part;
      case arr.length - 1: return result + ' and ' + part;
      default: return result + ', ' + part;
    }
  }
  
}());

const formatDuration = s => s == 0 ? 'now' :
     [Math.floor(s/60/60/24/365),
      Math.floor(s/60/60/24)%365,
      Math.floor(s/60/60)%24,  
      Math.floor(s/60)%60 ,
      s%60]
     .map((e,i)=> e + ' ' + ['year', 'day', 'hour', 'minute', 'second'][i] + (+e>1?'s': ''))
     .filter(e=> !/^0/.test(e))
     .join(', ')
     .replace(/,\s(?=[\d\s\w]*$)/, ' and ');


     function formatDuration (seconds){
      if(seconds == 0) return "now";
      var s = {
        "year" : (60 * 60 * 24 * 365),
        "day" : (60 * 60 * 24),
        "hour" : (60 * 60),
        "minute" : 60
      }
      var output = new Array();
      var years = Math.floor(seconds / s.year);
      if(years > 0){
        output.push(years + " year" + (years == 1 ? "" : "s"));
        seconds = seconds % s.year;
      }
      var days = Math.floor(seconds / s.day);
      if(days > 0){
        output.push(days + " day" + (days == 1 ? "" : "s"));
        seconds = seconds % s.day;
      }
      var hours = Math.floor(seconds / s.hour);
      if(hours > 0){
        output.push(hours + " hour" + (hours == 1 ? "" : "s"));
        seconds = seconds % s.hour;
      }
      var minutes = Math.floor(seconds / s.minute);
      if(minutes > 0){
        output.push(minutes + " minute" + (minutes == 1 ? "" : "s"));
        seconds = seconds % s.minute;
      }
      if(seconds > 0){
        output.push(seconds + " second" + (seconds == 1 ? "" : "s"));
      }
      if(output.length > 1){
        var last = output.pop();
        return output.join(", ") + " and " + last;
      } else {
        return output[0];
      }
    }


    const delegates = [
      { s: 'year', v: 60 * 60 * 24 * 365 },
      { s: 'day', v: 60 * 60 * 24 },
      { s: 'hour', v: 60 * 60 },
      { s: 'minute', v: 60 },
      { s: 'second', v: 1 }
    ];
    
    function formatDuration (seconds) {
      if (!seconds) return 'now';
      
      return delegates.reduce((ret, dg, idx) => {
        const val = Math.floor(seconds / dg.v);
        if (!val) return ret;
        seconds -= dg.v * val;
        const str = val > 1 ? dg.s + 's' : dg.s;
        const add = !ret ? '' : (seconds > 0 ? ', ' : ' and ');
        return ret + add + `${val} ${str}`;
      }, '');
    }

    function formatDuration (seconds) {
      if (seconds < 1) {
        return 'now';
      }
    
      const timeUnits = [{
        singular: 'year',
        plural: 'years',
        seconds: 31536000,
      }, {
        singular: 'day',
        plural: 'days',
        seconds: 86400,
      }, {
        singular: 'hour',
        plural: 'hours',
        seconds: 3600,
      }, {
        singular: 'minute',
        plural: 'minutes',
        seconds: 60,
      }, {
        singular: 'second',
        plural: 'seconds',
        seconds: 1,
      }];
      
      return timeUnits.map((unit, index) => {
        if (seconds >= unit.seconds) {
          const amountOfUnits = Math.floor(seconds / unit.seconds);
          const unitName = amountOfUnits > 1 ? unit.plural : unit.singular;
          seconds -= amountOfUnits * unit.seconds;
          const isLastUnit = index === timeUnits.length || !seconds;
          const isPreLastUnit = timeUnits.length - index === 1 || 
                                seconds < timeUnits[timeUnits.length - 2].seconds ||
                                seconds % timeUnits[index + 1].seconds === 0;
          let separator;
          if (isLastUnit) {
            separator = '';
          } else if (isPreLastUnit) {
            separator = ' and ';
          } else {
            separator = ', ';
          }
          
          return `${amountOfUnits} ${unitName}${separator}`
        }
        
        return '';
      }).join('');
    }

    function formatDuration (seconds) {
      var values = []
      var units = {
        'year': 31536000,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      }
      for (var unit in units) {
        if (units[unit] <= seconds) {
          var num = Math.floor(seconds / units[unit])
          values.push(num + ' ' + pluralize(unit,num))
          seconds -= units[unit] * num
        }
      }
      return oxfordJoin(values) || 'now'
    }
    
    function pluralize (word, num) {
      return num > 1 ? word + 's' : word
    }
    
    function oxfordJoin (arr) {
      return arr.reverse().map(function(el, idx){
        if (idx > 1)
          return el + ', '
        else if (idx == 1)
          return el + ' and '
        else
          return el
      }).reverse().join('')
    }

    const formatDuration = seconds =>
  (arr => seconds ? arr.filter(val => !/^0/.test(val)).map(val => (/^1 /).test(val) ? val.slice(0, -1) : val).join(`, `).replace(/,(?=[^,]*$)/, ` and`) : `now`)
  ([`${seconds / 31536000 ^ 0} years`, `${seconds / 86400 % 365 ^ 0} days`, `${seconds / 3600 % 24 ^ 0} hours`, `${seconds / 60 % 60 ^ 0} minutes`, `${seconds % 60} seconds`]);

  function formatDuration (seconds) {
  
    let str = '';
  
    let years = Math.floor(seconds / 31536000);
    let days = Math.floor((seconds - years * 31536000) / 86400);
    let hour = Math.floor(((seconds - years * 31536000) - days * 86400) / 3600);
    let min = Math.floor((((seconds - years * 31536000) - days * 86400) - hour * 3600) / 60);
    let sec = (((seconds - years * 31536000) - days * 86400) - hour * 3600) - min * 60;
  
    if (years == 0) years = '';
    if (days == 0) days = '';
    if (hour == 0) hour = '';
    if (min == 0) min = '';
    if (sec == 0) sec = '';
  
    if (years == 1) years = years + ' year';
    if (days == 1) days = days + ' day';
    if (hour == 1) hour = hour + ' hour';
    if (min == 1) min = min + ' minute';
    if (sec == 1) sec = sec + ' second';
  
    if (years > 1) years = years + ' years';
    if (days > 1) days = days + ' days';
    if (hour > 1) hour = hour + ' hours';
    if (min > 1) min = min + ' minutes';
    if (sec > 1) sec = sec + ' seconds';
  
    str = `${years}, ${days}, ${hour}, ${min}, ${sec}`
  
    let res = str.match(/\d+\s\w+/g);
  
    if (seconds == 0) return('now');
    else if (res.length == 1) return(res.join(' '));
    else {
      res[res.length - 1] = `and ${res[res.length - 1]}`;
      for (let i = 0; i < res.length - 2; i++) {
        res[i] = `${res[i]},`;
      }
      return(res.join(' '));
    }
  }

  function formatDuration (seconds) {
  
    let str = '';
  
    let years = Math.floor(seconds / 31536000);
    let days = Math.floor((seconds - years * 31536000) / 86400);
    let hour = Math.floor(((seconds - years * 31536000) - days * 86400) / 3600);
    let min = Math.floor((((seconds - years * 31536000) - days * 86400) - hour * 3600) / 60);
    let sec = (((seconds - years * 31536000) - days * 86400) - hour * 3600) - min * 60;
  
    if (years == 0) years = '';
    if (days == 0) days = '';
    if (hour == 0) hour = '';
    if (min == 0) min = '';
    if (sec == 0) sec = '';
  
    if (years == 1) years = years + ' year';
    if (days == 1) days = days + ' day';
    if (hour == 1) hour = hour + ' hour';
    if (min == 1) min = min + ' minute';
    if (sec == 1) sec = sec + ' second';
  
    if (years > 1) years = years + ' years';
    if (days > 1) days = days + ' days';
    if (hour > 1) hour = hour + ' hours';
    if (min > 1) min = min + ' minutes';
    if (sec > 1) sec = sec + ' seconds';
  
    str = `${years}, ${days}, ${hour}, ${min}, ${sec}`
  
    let res = str.match(/\d+\s\w+/g);
  
    if (seconds == 0) return('now');
    else if (res.length == 1) return(res.join(' '));
    else {
      res[res.length - 1] = `and ${res[res.length - 1]}`;
      for (let i = 0; i < res.length - 2; i++) {
        res[i] = `${res[i]},`;
      }
      return(res.join(' '));
    }
  }

  function formatDuration (seconds) {
    if(!seconds)return "now";
    var durations = {year:365*24*60*60,day:24*60*60,hour:60*60,minute:60,second:1};
    var english=[];
    for(var duration in durations){
      var nb = Math.floor(seconds/durations[duration]);
      if(nb)english.push(nb+" "+duration+(nb>1?'s':''));
      seconds%=durations[duration];
    }
    
    return english.join(", ").replace(/,([^,]*)$/," and$1");
    
  }

  function formatDuration(seconds) {
    var units = ['year', 'day', 'hour', 'minute', 'second'];
    var years = seconds / 60 / 60 / 24 / 365 < 1 ? 0 : seconds / 60 / 60 / 24 / 365;
    var days = seconds / 60 / 60 / 24 % 365;
    var hrs = seconds / 60 / 60 % 24;
    var mins = seconds / 60 % 60;
    return seconds ? [years, days, hrs, mins, seconds % 60].map(function(num, i) {
        num = parseInt(num, 10);
        return num && num + ' ' + units[i] + (num > 1 ? 's' : '');
    }).filter(Boolean).join(', ').replace(/,\s(?=[\d\s\w]+$)/, ' and ') : 'now';
}

function formatDuration (n) {
  var y = Math.floor(n/31536000),d = Math.floor(n%31536000/86400),h = Math.floor(n%31536000%86400/3600),
      m = Math.floor(n%31536000%86400%3600/60), s = Math.floor(n%31536000%86400%3600%60),
      a = (y ? y : '') + (!(y) ? '' : (y>1 ? ' years' : ' year')),b = (d ? d : '') + (!(d) ? '' : (d>1 ? ' days' : ' day')),
      c = (h ? h : '') + (!(h) ? '' : (h>1 ? ' hours' : ' hour')),x = (m ? m : '') + (!(m) ? '' : (m>1 ? ' minutes' : ' minute')),
      z = (s ? s : '') + (!(s) ? '' : (s>1 ? ' seconds' : ' second'))

  var w=(a ? a+', ' : '')+(b ? b+', ' : '')+(c ? c+', ' : '')+(x ? x+', ':'')+(z ? z+', ': ''),
      last = w.slice(0,w.length-2).lastIndexOf(',')
  return n>0 && last != -1? w.slice(0,last)+' and'+w.slice(last+1,w.length-2) : n>0 && last == -1 ? w.slice(0,last-1) : 'now'
}

function formatDuration (n) {
  var y = Math.floor(n/31536000),d = Math.floor(n%31536000/86400),h = Math.floor(n%31536000%86400/3600),
      m = Math.floor(n%31536000%86400%3600/60), s = Math.floor(n%31536000%86400%3600%60),
      a = (y ? y : '') + (!(y) ? '' : (y>1 ? ' years' : ' year')),b = (d ? d : '') + (!(d) ? '' : (d>1 ? ' days' : ' day')),
      c = (h ? h : '') + (!(h) ? '' : (h>1 ? ' hours' : ' hour')),x = (m ? m : '') + (!(m) ? '' : (m>1 ? ' minutes' : ' minute')),
      z = (s ? s : '') + (!(s) ? '' : (s>1 ? ' seconds' : ' second'))

  var w=(a ? a+', ' : '')+(b ? b+', ' : '')+(c ? c+', ' : '')+(x ? x+', ':'')+(z ? z+', ': ''),
      last = w.slice(0,w.length-2).lastIndexOf(',')
  return n>0 && last != -1? w.slice(0,last)+' and'+w.slice(last+1,w.length-2) : n>0 && last == -1 ? w.slice(0,last-1) : 'now'
}

function formatPlural(n, unit) {
  return n + ' ' + unit + ((Math.abs(n) !== 1) ? 's' : '');
}

function formatList(items) {
  if (items.length > 1) {
      return items.slice(0, items.length-1).join(', ') + ' and ' + items[items.length-1];
  } else {
      return String(items);
  }
}

function formatDuration(seconds) {
  var units = ["year", "day", "hour", "minute", "second"],
      spans = [Infinity, 365*24*60*60, 24*60*60, 60*60, 60, 1],
      result = [];
  for (var i = 0; i < units.length; i++) {
      var amount = Math.floor((seconds % spans[i]) / spans[i+1]);
      if (amount !== 0) {
          result.push(formatPlural(amount, units[i]));
      }
  }
  return formatList(result) || 'now';
}

const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;

const unitValues = [{
  unit: 'year',
  value: year
}, {
  unit: 'day',
  value: day
}, {
  unit: 'hour',
  value: hour
}, {
  unit: 'minute',
  value: minute
}, {
  unit: 'second',
  value: second
}];

function formatDuration(inputSecs) {
  if (typeof inputSecs !== 'number' || inputSecs < 0 || isNaN(inputSecs)) {
    throw new TypeError('formatDuration() may only be called with a non-negative number');
  }

  if (inputSecs === 0) {
    return 'now';
  }

  const parts = [];
  let secsRemaining = inputSecs;

  for (const { unit, value } of unitValues) {
    const count = Math.floor(secsRemaining / value);

    if (count > 0) {
      secsRemaining -= count * value;
      // If it's >= 1,000 years it'll use a comma or whatever they
      // use in that person's country (some use periods like Germany)
      const localeCount = count.toLocaleString();
      const label = count > 1 ? unit + 's' : unit;
      parts.push(`${localeCount} ${label}`);
    }
  }

  if (parts.length === 1) {
    return parts[0];
  }

  const last = parts.pop();

  return `${parts.join(', ')} and ${last}`;
}

const formatDuration = seconds =>

    ! seconds ? 'now' :  [ Math.floor( seconds / 31536000 ), Math.floor( seconds / 86400 ) % 365, Math.floor( seconds / 3600 ) % 24, Math.floor( seconds / 60 ) % 60, seconds%60 ]
    
    .map( ( n, i ) => ! n ? "" : n + [' year', ' day', ' hour', ' minute', ' second'][i] + ( n > 1 ? 's' : '' ) )
    
    .filter( el => el )
    
    .join(', ')
    
    .replace( /,([^,]*)$/, ' and$1' );
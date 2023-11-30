import {ConvertibleDate} from '..';
import {StringUtil} from './string.util';

/**
 * 日期相关工具类
 *
 * @author ZColin
 * @since 2019/8/29 20:17
 */
export class DateUtil {
    /** 一天的毫秒数 */
    static readonly ONE_DAY_MILLISECOND: number = 24 * 60 * 60 * 1000;
    
    /**
     * 获取秒时间戳
     */
    static getTimeSecondStamp(date: ConvertibleDate): number {
        const d = DateUtil.getDate(date);
        return d?.setMilliseconds(0) || 0;
    }
    
    /**
     * 获取当前秒时间戳
     */
    static getCurTimeSecondStamp(): number {
        return new Date().setMilliseconds(0);
    }
    
    /**
     * 获取当前分钟时间戳
     */
    static getCurTimeMinuteStamp(): number {
        return new Date().setSeconds(0, 0);
    }
    
    /**
     * 获取今天零点的时间戳
     */
    static getCurDayStamp(): number {
        return new Date().setHours(0, 0, 0, 0);
    }
    
    /**
     * 获取一天中最晚的时间戳
     */
    static getLatestSecondStampInDay(date: ConvertibleDate): number {
        let time = DateUtil.getLatestTimeInDay(date);
        return time?.getTime() || 0;
    }
    
    /**
     * 获取一天中最早的时间戳
     */
    static getEarliestSecondStampInDay(date: ConvertibleDate): number {
        let time = DateUtil.getEarliestTimeInDay(date);
        return time?.getTime() || 0;
    }
    
    /**
     * 获取一月中最早的时间戳
     */
    static getEarliestSecondStampInMonth(date: ConvertibleDate): number {
        let time = DateUtil.getEarliestTimeInMonth(date);
        return time?.getTime() || 0;
    }
    
    /**
     * 获取一月中最晚的时间戳
     */
    static getLatestSecondStampInMonth(date: ConvertibleDate): number {
        let time = DateUtil.getLatestTimeInMonth(date);
        return time?.getTime() || 0;
    }
    
    /**
     * 获取一季度中最早的时间戳
     */
    static getEarliestSecondStampInQuarter(date: ConvertibleDate): number {
        let time = DateUtil.getEarliestTimeInQuarter(date);
        return time?.getTime() || 0;
    }
    
    /**
     * 获取一季度中最晚的时间戳
     */
    static getLatestSecondStampInQuarter(date: ConvertibleDate): number {
        let time = DateUtil.getLatestTimeInQuarter(date);
        return time?.getTime() || 0;
    }
    
    /**
     * 获取当前年
     */
    static getCurrentYear(): number {
        return new Date().getFullYear();
    }
    
    /**
     * 获取当前月
     */
    static getCurrentMonth(): number {
        return new Date().getMonth();
    }
    
    /**
     * 获取当前天
     */
    static getCurrentDay(): number {
        return new Date().getDate();
    }
    
    /**
     * 若干天之前的日期
     * *yyyy-MM-dd 00:00:00*
     * @param days 天数
     * @param date 日期
     */
    static beforeDate(days: number, date: ConvertibleDate = new Date()): Date {
        let d = DateUtil.getEarliestTimeInDay(date);
        if (!d) {
            return undefined;
        }
        if (days == 0) {
            return d;
        }
        return new Date(d.getTime() - (DateUtil.ONE_DAY_MILLISECOND * days));
    }
    
    /**
     * 若干天之后的日期
     * *yyyy-MM-dd 00:00:00*
     * @param days 天数
     * @param date 日期
     */
    static afterDate(days: number, date: ConvertibleDate = new Date()): Date {
        return DateUtil.beforeDate(-days, date);
    }
    
    /**
     * 获取一天的最晚时间
     */
    static getLatestTimeInDay(date: ConvertibleDate = Date.now()): Date {
        const d = DateUtil.getDate(date);
        if (d) {
            d.setHours(23, 59, 59, 999);
        }
        return d;
    }
    
    /**
     * 获取一天的最早时间
     */
    static getEarliestTimeInDay(date: ConvertibleDate = new Date()): Date {
        const d = DateUtil.getDate(date);
        if (d) {
            d.setHours(0, 0, 0, 0);
        }
        return d;
    }
    
    /**
     * 获取一周的最早时间
     * 以星期一作为第一天
     */
    static getEarliestTimeInWeek(date: ConvertibleDate = new Date()): Date {
        //以星期一作为第一天
        let d = DateUtil.getDate(date);
        if (d) {
            const weekDay = d.getDay();
            if (weekDay > 0) {
                d = new Date(d.getTime() - DateUtil.ONE_DAY_MILLISECOND * (weekDay - 1));
            } else {
                d = new Date(d.getTime() - DateUtil.ONE_DAY_MILLISECOND * 6);
            }
            d.setHours(0, 0, 0, 0);
        }
        return d;
    }
    
    /**
     * 获取一周的最晚时间
     * 以星期一作为第一天
     */
    static getLatestTimeInWeek(date: ConvertibleDate = Date.now()): Date {
        //以星期一作为第一天
        let d = DateUtil.getDate(date);
        if (d) {
            const weekDay = d.getDay();
            if (weekDay > 0) {
                d = new Date(d.getTime() + DateUtil.ONE_DAY_MILLISECOND * (7 - weekDay));
            }
            d.setHours(23, 59, 59, 999);
        }
        return d;
    }
    
    /**
     * 获取一月的最早时间
     */
    static getEarliestTimeInMonth(date: ConvertibleDate = new Date()): Date {
        const d = DateUtil.getDate(date);
        if (d) {
            d.setDate(1);
            d.setHours(0, 0, 0, 0);
        }
        return d;
    }
    
    /**
     * 获取一月的最晚时间
     */
    static getLatestTimeInMonth(date: ConvertibleDate = Date.now()): Date {
        const d = DateUtil.getDate(date);
        if (d) {
            d.setDate(DateUtil.getDaysInMonth(d.getFullYear(), d.getMonth() + 1));
            d.setHours(23, 59, 59, 999);
        }
        return d;
    }
    
    /**
     * 获取季度的最早时间
     */
    static getEarliestTimeInQuarter(date: ConvertibleDate = new Date()): Date {
        const d = DateUtil.getDate(date);
        if (d) {
            d.setMonth(DateUtil.getEarliestMonthInQuarter(date));
            d.setDate(1);
            d.setHours(0, 0, 0, 0);
        }
        return d;
    }
    
    /**
     * 获取季度的最晚时间
     */
    static getLatestTimeInQuarter(date: ConvertibleDate = Date.now()): Date {
        const d = DateUtil.getDate(date);
        if (d) {
            d.setMonth(DateUtil.getLatestMonthInQuarter(date));
            d.setDate(DateUtil.getDaysInMonth(d.getFullYear(), d.getMonth() + 1));
            d.setHours(23, 59, 59, 999);
        }
        return d;
    }
    
    /**
     * 判断两个日期是否相同
     * @param date1 日期1
     * @param date2 日期2
     * @param format 比较格式
     */
    static isSameDate(date1: ConvertibleDate, date2: ConvertibleDate,
                      format: 'yyyy-MM-dd' | 'yyyy-MM' | 'yyyy' = 'yyyy-MM-dd'): boolean {
        const d1 = DateUtil.getDate(date1);
        const d2 = DateUtil.getDate(date2);
        if (!d1 || !d2) {
            return false;
        }
        return DateUtil.getDateStr(d1, format) == DateUtil.getDateStr(d2, format);
    }
    
    /**
     * 判断一个日期是否在当日（包含当日）之前的七天内
     */
    static isInSevenDayBefore(date: Date): boolean {
        const d = new Date(date);
        if (!d) {
            return false;
        }
        const stamp = d.getTime();
        const today = DateUtil.getEarliestTimeInDay(DateUtil.getLatestTimeInDay()).getTime();
        const sevenDayBefore = DateUtil.beforeDate(6).getTime();
        return (stamp <= today) && (stamp >= sevenDayBefore);
    }
    
    /**
     * 获取日期时间字符串
     * @param date 日期时间
     */
    static getDateTimeStr(date?: Date): string {
        return DateUtil.getDateStr(date, 'yyyy-MM-dd HH:mm:ss');
    }
    
    /**
     * 日期对象转为日期字符串
     * @param date 需要格式化的日期对象
     * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
     * @example  dateFormat(new Date())                               "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
     * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
     * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
     * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @returns string
     */
    static getDateStr(date?: Date, sFormat: string = 'yyyy-MM-dd'): string {
        date = date ? new Date(date) : new Date();
        const time = {
            Year: 0,
            TYear: '0',
            Month: 0,
            TMonth: '0',
            Day: 0,
            TDay: '0',
            Hour: 0,
            THour: '0',
            hour: 0,
            Thour: '0',
            Minute: 0,
            TMinute: '0',
            Second: 0,
            TSecond: '0',
            Millisecond: 0
        };
        time.Year = date.getFullYear();
        time.TYear = String(time.Year).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
        time.Minute = date.getMinutes();
        time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
        time.Second = date.getSeconds();
        time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
        time.Millisecond = date.getMilliseconds();
        
        return sFormat.replace(/yyyy/ig, String(time.Year))
                      .replace(/yyy/ig, String(time.Year))
                      .replace(/yy/ig, time.TYear)
                      .replace(/y/ig, time.TYear)
                      .replace(/MM/g, time.TMonth)
                      .replace(/M/g, String(time.Month))
                      .replace(/dd/ig, time.TDay)
                      .replace(/d/ig, String(time.Day))
                      .replace(/HH/g, time.THour)
                      .replace(/H/g, String(time.Hour))
                      .replace(/hh/g, time.Thour)
                      .replace(/h/g, String(time.hour))
                      .replace(/mm/g, time.TMinute)
                      .replace(/m/g, String(time.Minute))
                      .replace(/ss/ig, time.TSecond)
                      .replace(/s/ig, String(time.Second))
                      .replace(/fff/ig, String(time.Millisecond));
    }
    
    /**
     * 获取日期  "2018-10-10 10:10:10" --> "2018-10-10"
     * @param time 日期+时间
     */
    static getDateFromStr(time: string): string {
        let result = '';
        if (time) {
            result = time.split(/[ ]+/)[0];
        }
        return result;
    }
    
    /**
     * 获取时间用..以前的形式
     */
    static getTimeAgo(oldTime: ConvertibleDate): string {
        const d = DateUtil.getDate(oldTime);
        if (!d) {
            return '';
        }
        const minute: number = 1000 * 60;
        const hour: number = minute * 60;
        const day: number = hour * 24;
        const month: number = day * 30;
        const year: number = day * 365;
        const now = new Date().getTime();
        const old = d.getTime();
        const diffValue = now - old;
        const yearC = diffValue / year;
        const monthC = diffValue / month;
        const weekC = diffValue / (7 * day);
        const dayC = diffValue / day;
        const hourC = diffValue / hour;
        const minC = diffValue / minute;
        if (yearC >= 1) {
            return Math.floor(monthC) + '年前';
        } else if (monthC >= 1) {
            return Math.floor(monthC) + '个月前';
        } else if (weekC >= 1) {
            return Math.floor(weekC) + '周前';
        } else if (dayC >= 1) {
            return Math.floor(dayC) + '天前';
        } else if (hourC >= 1) {
            return Math.floor(hourC) + '小时前';
        } else if (minC >= 1) {
            return Math.floor(minC) + '分钟前';
        } else {
            return '刚刚';
        }
    }
    
    /**
     * 获取时间以几分钟前，几小时前，昨天，大于两天显示日期
     */
    static getServealTimeAgo(oldTime: Date): string {
        const minute: number = 1000 * 60;
        const hour: number = minute * 60;
        const day: number = hour * 24;
        const now = new Date().getTime();
        const old = oldTime.getTime();
        const diffValue = now - old;
        const dayC = diffValue / day;
        const hourC = diffValue / hour;
        const minC = diffValue / minute;
        if (dayC >= 2) {
            return DateUtil.getDateStr(oldTime, 'yyyy-MM-dd HH:mm:ss');
        } else if (dayC >= 1) {
            return '昨天' + DateUtil.getDateStr(oldTime, 'HH:mm');
        } else if (hourC >= 1) {
            return Math.floor(hourC) + '小时前';
        } else if (minC >= 1) {
            return Math.floor(minC) + '分钟前';
        } else {
            return '刚刚';
        }
    }
    
    /**
     * 获得季度的开端月份
     */
    static getEarliestMonthInQuarter(date: ConvertibleDate): number {
        return DateUtil.getQuarter(date) * 3;
    }
    
    /**
     * 获得季度的结束月份
     */
    static getLatestMonthInQuarter(date: ConvertibleDate): number {
        return DateUtil.getQuarter(date) * 3 + 2;
    }
    
    /**
     * 获得日期的季度
     */
    static getQuarter(date: ConvertibleDate): number {
        const d = DateUtil.getDate(date);
        if (d) {
            const month = d.getMonth();
            return Math.floor(month / 3);
        }
        return 0;
    }
    
    /**
     * ## 获取某月的总天数
     *
     * **月份从 1 开始**
     *
     * **使用date.getMonth()获取的月份需要+1**
     */
    static getDaysInMonth(year: number, month: number): number {
        return new Date(year, month, 0).getDate();
    }
    
    /**
     * 获取新的日期实例
     */
    static getDate(date: ConvertibleDate): Date {
        if (date instanceof Date) {
            return new Date(date);
        }
        
        let timeStamp: number;
        
        if (typeof date === 'string' && StringUtil.isNotEmpty(date)) {
            timeStamp = Date.parse(date);
        } else if (typeof date === 'number') {
            timeStamp = date;
        }
        
        if (Number.isSafeInteger(timeStamp)) {
            return new Date(date);
        }
        
        return undefined;
    }
    
    /**
     * 获取当前日期到之前某一年的季度信息(名称以及minDate、maxDate)
     * @param earlyYear  最早的年份
     */
    static getEarlyQuartsInfo(earlyYear: number) {
        const dateItems: { des: string, minDate: number, maxDate: number }[] = [];
        const currentYear = DateUtil.getCurrentYear();
        for (let i = currentYear; i >= earlyYear; i--) {
            // 默认第四季度
            let k = 4;
            if (i === currentYear) {
                k = DateUtil.getQuarter(new Date()) + 1;
            }
            for (let j = k; j >= 1; j--) {
                const dateStr = `${i}/${j * 3}/01`;
                dateItems.push({
                    des: i + '年第' + j + '季度',
                    minDate: DateUtil.getEarliestSecondStampInQuarter(dateStr),
                    maxDate: DateUtil.getLatestSecondStampInQuarter(dateStr)
                });
            }
        }
        return dateItems;
    }
    
    /**
     * 获取中文周
     */
    static getWeekDayStr(day: ConvertibleDate): string {
        const d = DateUtil.getDate(day);
        const num = d instanceof Date ? d.getDay() : undefined;
        switch (num) {
            case 1:
                return '周一';
            case 2:
                return '周二';
            case 3:
                return '周三';
            case 4:
                return '周四';
            case 5:
                return '周五';
            case 6:
                return '周六';
            case 0:
                return '周日';
            default:
                return '';
        }
    }
    
    /**
     * [秒数]或[毫秒数]转换为x天x小时x分钟
     * @param value  [秒数]或[毫秒数]
     * @param format 目标格式：'HHmm' | 'ddHHmm'（默认）
     * @param type  第一个参数的类型：'s':秒 | 'ms':毫秒（默认）
     */
    static getDurationStr(value: number, format: 'ddHHmm' | 'HHmm' = 'HHmm', type: 'ms' | 's' = 'ms'): string {
        if (typeof value != 'number') {
            return '';
        }
        const minute = (type === 's') ? 60 : 60 * 1000;
        const hour: number = minute * 60;
        const day: number = hour * 24;
        
        if (value < minute) {
            return '0分钟';
        } else {
            let str = '';
            let dayC = 0;
            if (format === 'ddHHmm') {
                dayC = (value / day) >> 0;
                value = value - (dayC * day);
            }
            
            const hourC = (value / hour) >> 0;
            value = value - (hourC * hour);
            
            const minC = (value / minute) >> 0;
            if (dayC > 0) {
                str = dayC + '天';
            }
            if (hourC > 0) {
                str = str + hourC + '小时';
            }
            if (minC > 0) {
                str = str + minC + '分钟';
            }
            return str;
        }
        
    }
    
    /**
     * 比较两个时间的先后
     * 忽略日期
     * @param d1 时间1
     * @param d2 时间2
     * @return -1 d1<d2 | 0 d1==d2 | 1 d1>d2
     */
    static compareTime(d1: ConvertibleDate, d2: ConvertibleDate): -1 | 0 | 1 {
        const t1 = DateUtil.getDate(d1);
        const t2 = DateUtil.getDate(d2);
        if (!t1 || !t2) {
            return undefined;
        }
        t1.setFullYear(2000, 1, 1);
        t2.setFullYear(2000, 1, 1);
        const a = t1.setMilliseconds(0);
        const b = t2.setMilliseconds(0);
        return a < b ? -1 : (a > b ? 1 : 0);
    }
    
    /**
     * 比较两个日期时间的先后
     * @param d1 日期1
     * @param d2 日期2
     * @return -1 d1<d2 | 0 d1==d2 | 1 d1>d2
     */
    static compareDateTime(d1: ConvertibleDate, d2: ConvertibleDate): -1 | 0 | 1 {
        const t1 = DateUtil.getDate(d1);
        const t2 = DateUtil.getDate(d2);
        if (!t1 || !t2) {
            return undefined;
        }
        const a = t1.setMilliseconds(0);
        const b = t2.setMilliseconds(0);
        return a < b ? -1 : (a > b ? 1 : 0);
    }
    
    /**
     * 比较两个日期的先后
     * @param d1 日期1
     * @param d2 日期2
     * @return -1 d1<d2 | 0 d1==d2 | 1 d1>d2
     */
    static compareDate(d1: ConvertibleDate, d2: ConvertibleDate): -1 | 0 | 1 {
        const t1 = DateUtil.getDate(d1);
        const t2 = DateUtil.getDate(d2);
        if (!t1 || !t2) {
            return undefined;
        }
        const a = t1.setHours(0, 0, 0, 0);
        const b = t2.setHours(0, 0, 0, 0);
        return a < b ? -1 : (a > b ? 1 : 0);
    }
    
    /**
     * 计算日期间隔天数
     * @param d1 日期1
     * @param d2 日期2
     */
    static differenceDays(d1: ConvertibleDate, d2: ConvertibleDate): number {
        const date1 = DateUtil.getDate(d1);
        const date2 = DateUtil.getDate(d2);
        if (!date1 || !date2) {
            return undefined;
        }
        const a = date1.setHours(0, 0, 0, 0);
        const b = date2.setHours(0, 0, 0, 0);
        return (a - b) / DateUtil.ONE_DAY_MILLISECOND;
    }
    
    /**
     * 获得一个由第一个的日期和第二个的时间组成的日期时间(不含秒)
     * @param d1 Date
     * @param d2 Date
     */
    static assembleDateAndTime(d1: ConvertibleDate, d2: ConvertibleDate): Date {
        const d = DateUtil.getDate(d1);
        const t = DateUtil.getDate(d2);
        if (!d) {
            return undefined;
        }
        
        return new Date(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            t ? t.getHours() : 0,
            t ? t.getMinutes() : 0,
            0,
            0);
    }
    
    /**
     * 秒置为零
     */
    static clearSecond(...dates: Date[]): void {
        dates?.forEach(d => {
            d?.setSeconds(0, 0);
        });
    }
}

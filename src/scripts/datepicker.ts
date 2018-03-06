export default class Datepicker {
    private options: any;

    private month: HTMLElement;
    private next: HTMLElement;
    private previous: HTMLElement;
    private label: HTMLElement;
    private activeDates: any;
    private date: any;
    private todaysDate: any;

    constructor (month: HTMLElement, next: HTMLElement, previous: HTMLElement, label: HTMLElement) {
        this.month = this.month;
        this.next = this.next;
        this.previous = this.previous;
        this.label = this.label;
        this.activeDates = null;
        this.date = new Date();
        this.todaysDate = new Date();

        console.log('Datepicker');
    }

    public init (options: any) {
        this.options = options
        this.date.setDate(1)
        this.createMonth()
        this.createListeners()
    };

    public createListeners (): void {
        var _this = this
        this.next.addEventListener('click', function () {
            _this.clearCalendar()
            var nextMonth = _this.date.getMonth() + 1
            _this.date.setMonth(nextMonth)
            _this.createMonth()
        })

        this.previous.addEventListener('click', function () {
            _this.clearCalendar()
            var prevMonth = _this.date.getMonth() - 1
            _this.date.setMonth(prevMonth)
            _this.createMonth()
        })
    };

    public createDay (num: number, day: number, year: number): void {
        var newDay = <any>document.createElement('div');
        var dateEl = <any>document.createElement('span');
        dateEl.innerHTML = num;
        newDay.className = 'vcal-date'
        newDay.setAttribute('data-calendar-date', this.date)

        /** if it's the first day of the month */
        if (num === 1) {
            if (day === 0) {
                newDay.style.marginLeft = (6 * 14.28) + '%'
            } else {
                newDay.style.marginLeft = ((day - 1) * 14.28) + '%'
            }
        }

        if (this.options.disablePastDays && this.date.getTime() <= this.todaysDate.getTime() - 1) {
            newDay.classList.add('vcal-date--disabled');
        } else {
            newDay.classList.add('vcal-date--active');
            newDay.setAttribute('data-calendar-status', 'active');
        }

        if (this.date.toString() === this.todaysDate.toString()) {
            newDay.classList.add('vcal-date--today');
        }

        newDay.appendChild(dateEl);
        console.log(this.month);
        this.month.appendChild(newDay);
    };

    public dateClicked(): void {
        var _this = this
        this.activeDates = document.querySelectorAll(
            '[data-calendar-status="active"]'
        )
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].addEventListener('click', function (event: any) {
                var picked = document.querySelectorAll(
                    '[data-calendar-label="picked"]'
                    )[0]
                picked.innerHTML = this.dataset.calendarDate
                _this.removeActiveClass()
                this.classList.add('vcal-date--selected')
            })
        }
    };

    public createMonth(): void {
        var currentMonth = this.date.getMonth()
        while (this.date.getMonth() === currentMonth) {
            this.createDay(
                this.date.getDate(),
                this.date.getDay(),
                this.date.getFullYear()
                )
            this.date.setDate(this.date.getDate() + 1)
        }
        /** while loop trips over and day is at 30/31, bring it back */
        this.date.setDate(1)
        this.date.setMonth(this.date.getMonth() - 1)

        this.label.innerHTML =
        this.monthsAsString(this.date.getMonth()) + ' ' + this.date.getFullYear()
        this.dateClicked()
    };

    public monthsAsString(monthIndex: any): any {
        return [
        'January',
        'Febuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
        ][monthIndex];
    };

    public clearCalendar(): void {
        this.month.innerHTML = ''
    };

    public removeActiveClass(): void {
        for (var i = 0; i < this.activeDates.length; i++) {
            this.activeDates[i].classList.remove('vcal-date--selected')
        }
    };
}

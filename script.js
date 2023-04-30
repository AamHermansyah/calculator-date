// darkmode function
const darkmode = document.querySelectorAll('.mode');
darkmode.forEach(button => {
    button.addEventListener('click', (e) => {
        document.body.classList.toggle('darkmode');
    })
})

function calculator1(){
    // Mendapatkan tanggal hari ini
    const today = new Date();
    const { day, month, year } = formatDate(today);
    document.querySelector('.hasil').textContent = `${day} ${month} ${year}`;

    // input number
    const MAX_DAY = 18250;
    const MAX_MONTH = 600;
    const MAX_YEAR = 50;
    const number_display = document.getElementById('number');
    const number_input = document.querySelectorAll('.input-number');
    let max_input = MAX_DAY;
    number_input.forEach(input => {
        input.addEventListener('click', (e) => {
            const value = e.target.dataset.number;
            if((value === '0' && number_display.textContent === '0') || +(number_display.textContent + value) > max_input) return;
            if(number_display.textContent === '0') number_display.textContent = value;
            else number_display.textContent += value;
        })
    })

    // delete input function
    const delete_button = document.getElementById('delete');
    delete_button.addEventListener('click', () => {
        if(number_display.textContent.length === 1) return number_display.textContent = '0';
        number_display.textContent = number_display.textContent.split('').reverse().slice(1).reverse().join('');
    })

    // clear input function
    const clear_button = document.getElementById('clear');
    clear_button.addEventListener('click', () => {
        number_display.textContent = '0'
    })

    // time input (satuan waktu) function (hari, bulan, tahun)
    const time_display = document.getElementById('time');
    const time_input = document.querySelectorAll('.time');
    time_input.forEach(input => {
        input.addEventListener('click', (e) => {
            time_display.textContent = e.target.dataset.time;
            switch(e.target.dataset.time){
                case 'Years':
                    max_input = MAX_YEAR;
                    if(+number_display.textContent > MAX_YEAR){
                        let number_value = number_display.textContent;
                        number_display.textContent = +number_value > MAX_YEAR ? MAX_YEAR : number_value
                    }
                    break;
                case 'Months':
                    max_input = MAX_MONTH;
                    if(+number_display.textContent > MAX_MONTH){
                        let number_value = number_display.textContent;
                        number_display.textContent = +number_value > MAX_MONTH ? MAX_MONTH : number_value
                    }
                    break;
                default:
                    max_input = MAX_DAY;
                    return;
            }
        })
    })

    // type time function (past/lampau, future/masa depan)
    const type_time_display = document.getElementById('type-time');
    const type_time_input = document.querySelectorAll('.type-time');
    type_time_input.forEach(input => {
        input.addEventListener('click', (e) => {
            type_time_display.textContent = e.target.dataset.typetime;
        })
    })

    // output
    const output_button = document.getElementById('output');
    const output_display = document.querySelector('.hasil');
    output_button.addEventListener('click', () => {
        const number = +document.getElementById('number').textContent;
        const time = document.getElementById('time').textContent;
        const type_time = document.getElementById('type-time').textContent;
        
        const today = new Date();
        let time_target;
        switch(time){
            case 'Years':
                time_target = number * 365;
                break;
            case 'Months':
                time_target = number * 30;
                break;
            default:
                time_target = number;
                break;
        }

        time_target = type_time === "Past" ? time_target * (-1) : time_target;
        
        let result = new Date(today);
        result.setDate(today.getDate() + time_target);

        const { day, month, year } = formatDate(result);
        output_display.textContent = `${day} ${month} ${year}`;
    })
}

calculator1();

function calculator2(){
    // element variable
    const sum_all_button = document.getElementById('sum-all');
    const all_button = document.getElementById('all');
    const or_display = document.querySelectorAll('.or');
    const type_time_button = document.querySelectorAll('.checkbox input');
    const days_display = document.getElementById('days');
    const months_display = document.getElementById('months');
    const years_display = document.getElementById('years');
    const now_button = document.querySelectorAll('.now');
    const input_date = document.querySelectorAll('.input-date');
    const sum_button = document.getElementById('sum');
    const or_button = document.getElementById('or-button');
    const reset_button = document.getElementById('reset');
    const output_button = document.getElementById('output-2');

    const INIT_MONTH = 30;
    const INIT_YEAR = 365;
    let result_output = {
        or_type: {
            days: 0,
            months: 0,
            years: 0
        },
        sum_type: {
            days: 0,
            months: 0,
            years: 0
        }
    };
    let type_count = 'or';
    let input_date_is_valid = {
        from: false,
        to: false
    };

    // init value
    resetInitValueDisplay();

    // set value
    function setValueDate(day = 0, month = 0, year = 0){
        days_display.firstChild.textContent = day;
        months_display.firstChild.textContent = month;
        years_display.firstChild.textContent = year;
        result_output = {
            or_type: {
                days: 0,
                months: 0,
                years: 0,
            },
            sum_type: {
                days: 0,
                months: 0,
                years: 0,
            }
        }
    }

    // reset and initial value function
    function resetInitValueDisplay(){
        setValueDate();
        input_date.forEach((input, index) => {
            input.value = '';
            input.style.outline = 'none';
            const type = index === 0 ? 'from' : 'to';
            input_date_is_valid = {
                ...input_date_is_valid,
                [type]: false
            }
        })
    }

    // handle input change
    const regex =  /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    input_date.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const isValidRegex = regex.test(input.value);
            const type = index === 0 ? 'from' : 'to';
            if(isValidRegex){
                const year = input.value.split('/')[2];
                if(year >= 1940 && year <= 2070) input.style.outline = '1px solid green';
                else input.style.outline = '1px solid red';
                input_date_is_valid = {
                    ...input_date_is_valid,
                    [type]: year >= 1940 && year <= 2070 ? true : false
                }
            } else {
                input.style.outline = '1px solid red';
                input_date_is_valid = {
                    ...input_date_is_valid,
                    [type]: false
                }
            }
        })
    })

    // button now date
    now_button.forEach((button, index) => {
        button.addEventListener('click', (e) => {
            let { day, month, year } = formatDate(new Date(), 'dd-mm-yyyy');
            day = day.split(', ')[1];

            if (+day < 10) day = `0${day}`;
            if (+month < 10) month = `0${month}`;

            button.previousElementSibling.value = `${day}/${month}/${year}`;
            input_date.forEach((input, index_input) => {
                if(index === index_input) input.style.outline = '1px solid green';
                const type = index === 0 ? 'from' : 'to';
                input_date_is_valid = {
                    ...input_date_is_valid,
                    [type]: true
                }
            })
        })
    })

    // handle sum and sum all button
    function handleSumAndSumAllButton(){
        days_display.classList.remove('hidden')
        months_display.classList.remove('hidden')
        years_display.classList.remove('hidden')
        type_time_button.forEach(e => {
            e.checked = true;
        })
    }

    // or button
    or_button.addEventListener('click', () => {
        // set output
        setValueDate();

        or_display.forEach((or, index) => {
            const isDaysHidden = days_display.classList.contains('hidden');
            const isMonthsHidden = months_display.classList.contains('hidden');            
            const isYearsHidden = years_display.classList.contains('hidden');            

            if(index === 0 && isDaysHidden || (isMonthsHidden && isYearsHidden)) return;
            if(index === 1){
                const isOneContainHidden = isMonthsHidden || isYearsHidden;
                if(isOneContainHidden) return;
            }
            or.classList.remove('hidden');
            type_count = 'or';
        })
    })

    // all button
    all_button.addEventListener('click', () => {
        // set output
        setValueDate();

        or_display.forEach(or => {
            or.classList.remove('hidden');
            handleSumAndSumAllButton();
            type_count = 'or';
        })
    })

    // type time button
    type_time_button.forEach((button) => {
        button.addEventListener('click', (e) => {
            // set output
            setValueDate();

            const type = e.target.dataset.time;
            const target = document.getElementById(type);
            const isLastChecked = Array.from(type_time_button).map(input => input.checked).filter(isChecked => isChecked);
            if(isLastChecked.length >= 1){
                target.classList.toggle('hidden');
            } else e.target.checked = true;

            if(type_count === 'or'){
                let  isDaysHidden = days_display.classList.contains('hidden');
                let  isMonthsHidden = months_display.classList.contains('hidden');
                let  isYearsHidden = years_display.classList.contains('hidden');

                if(!isDaysHidden && (!isMonthsHidden || !isYearsHidden)){
                    days_display.nextElementSibling.classList.remove('hidden')
                } else days_display.nextElementSibling.classList.add('hidden');

                if(!isMonthsHidden && !isYearsHidden){
                    months_display.nextElementSibling.classList.remove('hidden')
                } else months_display.nextElementSibling.classList.add('hidden');
            }
        })
    })

    // sum button
    sum_button.addEventListener('click', () => {
        // set output
        setValueDate();

        or_display.forEach(or => {
            or.classList.add('hidden');
            type_count = 'sum';
        })
    })

    // sum all button
    sum_all_button.addEventListener('click', () => {
        // set output
        setValueDate();

        or_display.forEach(or => {
            or.classList.add('hidden');
            handleSumAndSumAllButton();
            type_count = 'sum';
        })
    })

    // output button
    output_button.addEventListener('click', () => {
        if(!input_date_is_valid.from || !input_date_is_valid.to) {
            input_date.forEach((input, index) => {
                if(!input_date_is_valid.from && index === 0) input.style.outline = '1px solid red';
                if(!input_date_is_valid.to && index === 1) input.style.outline = '1px solid red';
            })

            return;
        };

        let [from, to] = Array.from(input_date).map(input => {
            const [dd, mm, yyyy] = input.value.split('/');
            return `${mm}/${dd}/${yyyy}`
        });

        // check if to lower than from (date)
        const isToDateLowerThanFromDate = new Date(from).getTime() > new Date(to).getTime();
        if(isToDateLowerThanFromDate) [from, to] = [to, from];

        const datesLength = dateRangeLength(from, to);
          
        if(type_count === 'or'){
            result_output = {
                ...result_output,
                or_type: {
                    days: datesLength,
                    months: +Number(datesLength / INIT_MONTH).toFixed(2),
                    years: +Number(datesLength / INIT_YEAR).toFixed(2)
                }
            }

            const {days, months, years} = result_output.or_type;
            setValueDate(days, months, years);
            return;
        }

        // if type count === 'sum'
        handleResultOutput();
        const { days, months, years } = result_output.sum_type;
        setValueDate(days, months, years);

        // handle result_output.sum_type
        function handleResultOutput(){
            let  isDaysHidden = days_display.classList.contains('hidden');
            let  isMonthsHidden = months_display.classList.contains('hidden');
            let  isYearsHidden = years_display.classList.contains('hidden');
            let current_date = datesLength;
            
            // reset result_output.sum_type
            result_output = {
                ...result_output,
                sum_type: {
                    days: 0,
                    months: 0,
                    years: 0
                }
            }

            if(current_date >= INIT_YEAR && !isYearsHidden){
                const { data, temp } = handleOutputSumType(result_output, current_date, 'years', INIT_YEAR);
                result_output = data;
                current_date -= temp;
            }

            if(current_date >= INIT_MONTH && !isMonthsHidden){
                const { data, temp } = handleOutputSumType(result_output, current_date, 'months', INIT_MONTH);
                result_output = data;
                current_date -= temp;
            }

            if(current_date > 0 && !isDaysHidden){
                result_output =  handleOutputSumType(result_output, current_date, 'days').data;
                current_date = 0;
                return;
            };

            // if days not exist
            if(current_date > 0 && isDaysHidden && !isMonthsHidden){
                result_output = {
                    ...result_output,
                    sum_type: {
                        ...result_output.sum_type,
                        months: +result_output.sum_type.months + (+Number(current_date / INIT_MONTH).toFixed(2))
                    }
                }
                current_date = 0;
                return
            }

            // if only years is exist
            result_output = {
                ...result_output,
                sum_type: {
                    ...result_output.sum_type,
                    years: +result_output.sum_type.years + (+Number(current_date / INIT_YEAR).toFixed(2))
                }
            }
            current_date = 0;
        }

        // handle set result_output.sum_type
        function handleOutputSumType(data, current, type, INIT_TIME_TYPE = 1){
            current = Math.floor(current / INIT_TIME_TYPE);
            let temp = current * INIT_TIME_TYPE;
            data = {
                ...data,
                sum_type: {
                    ...data.sum_type,
                    [type]: current
                }
            }

            return {data, temp}
        }
    })

    // reset button
    reset_button.addEventListener('click', () => {
        or_display.forEach(or => {
            or.classList.remove('hidden');
            resetInitValueDisplay();
            handleSumAndSumAllButton();
            type_count = 'or';
        })
    })
}

calculator2();

// utils
function formatDate(date, template){
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",  "Saturday"];
    let month = template ? date.getMonth() + 1 : MONTHS[date.getMonth()],
        day_date = '' + date.getDate(),
        year = date.getFullYear(),
        day = date.getDay();
    if (day_date.length < 2) 
        day_date = '0' + day_date;
    day = DAYS[Number(day)];
    return {day: `${day}, ${day_date}`, month, year}
}

function dateRangeLength(startDate, endDate, steps = 1) {
    const dateArray = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate));
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    return dateArray.length;
}

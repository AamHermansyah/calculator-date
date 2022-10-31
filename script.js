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
number_input.forEach(input => {
    input.addEventListener('click', (e) => {
        const value = e.target.dataset.number;
        if((value === '0' && number_display.textContent === '0') || +(number_display.textContent + value) > MAX_DAY) return;
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
                if(+number_display.textContent > MAX_YEAR){
                    let number_value = number_display.textContent;
                    number_display.textContent = +number_value > MAX_YEAR ? MAX_YEAR : number_value
                }
                break;
            case 'Months':
                if(+number_display.textContent > MAX_MONTH){
                    let number_value = number_display.textContent;
                    number_display.textContent = +number_value > MAX_MONTH ? MAX_MONTH : number_value
                }
                break;
            default:
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

function formatDate(date){
    const MONTHS = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    let month = MONTHS[date.getMonth()],
        day_date = '' + date.getDate(),
        year = date.getFullYear(),
        day = date.getDay();
    if (day_date.length < 2) 
        day_date = '0' + day_date;
    day = DAYS[Number(day)];
    return {day: `${day}, ${day_date}`, month, year}
}

const darkmode = document.querySelector('.mode');
darkmode.addEventListener('click', (e) => {
    document.body.classList.toggle('darkmode');
})
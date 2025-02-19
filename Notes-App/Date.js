export const renderTime = (time) => {
    let date = new Date();
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let created_time = {
        year : date.getFullYear(),
        month: months[date.getMonth()],
        date: date.getDate(),
        hours : date.getHours(),
        minutes : date.getMinutes(),
        seconds : date.getSeconds()
    }
    return created_time;
}
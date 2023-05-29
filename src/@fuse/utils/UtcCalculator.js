Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

export default function UtcCalculator(date, plus) {
    if (plus === 0) {
        return date.addHours(plus).toISOString();
    } else {
        return date.addHours(new Date().getTimezoneOffset() / 60);
    }
}
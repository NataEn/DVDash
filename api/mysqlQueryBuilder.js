const TOTAL_REVENUE = `
SELECT  
SUM(amount)AS total,
SUM(
  case YEARWEEK(date(payment_date))
    when YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
    then amount
    ELSE 0
  END) AS total_this_week,
SUM(
  case date(payment_date)
    when DATE_SUB(CURDATE(),INTERVAL 15 YEAR)
    then amount
  ELSE 0
 end) AS total_today
 FROM payment;`;
const TOTAL_WEEK_REVENUE = `
SELECT DAYNAME(payment_date) AS day_name,date(payment_date) as date,
SUM(amount) as revenue
FROM payment
WHERE YEARWEEK(date(payment_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
GROUP BY date(payment_date),day_name;`;

module.exports = {
  TOTAL_REVENUE,
  TOTAL_WEEK_REVENUE,
};

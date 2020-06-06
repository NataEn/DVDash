const UPDATE_DATE = `
UPDATE customer
SET create_date=DATE_FORMAT(create_date,'2005-%m-%d %T');
UPDATE actor_copy
SET last_update =  CONCAT('2020-',floor(1+RAND()*12),'-',FLOOR(1+RAND()*27));`;

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
const TOTAL_CUSTOMERS = `

 SELECT  
COUNT(*) AS total_customers,
COUNT(case when (gender='F') then 1 end) AS total_female_customers,
COUNT(case when (gender='M') then 1 end)AS total_male_customers,
COUNT(case when YEARWEEK(date(create_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
    then 1
  END) AS total_customers_this_week,
  
  COUNT(
  case 
  when YEARWEEK(date(create_date))= YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
  AND (gender='F')
    then 1
  END) AS total_female_customers_this_week,
  
  COUNT(
  case 
  when YEARWEEK(date(create_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
  AND (gender='M')
    then 1
  END) AS total_male_customers_this_week,
  
COUNT(
  case when date(create_date)=DATE_SUB(CURDATE(),INTERVAL 15 YEAR)
    then 1
end) AS total_customers_today,
 
 COUNT(
  case 
  when date(create_date)=DATE_SUB(CURDATE(),INTERVAL 15 YEAR) 
  AND (gender='F')
    then 1
 end) AS total_female_customers_today,
 
 COUNT(case 
  when date(create_date)=DATE_SUB(CURDATE(),INTERVAL 15 YEAR) 
  AND (gender='M')
    then 1
 end) AS total_male_customers_today
 
 FROM customer;
 `;
const TOTAL_WEEK_REVENUE = `
SELECT DAYNAME(payment_date) AS day_name,date(payment_date) as date,
SUM(amount) as revenue
FROM payment
WHERE YEARWEEK(date(payment_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
GROUP BY date(payment_date),day_name;`;
const TOTAL_WEEK_CUSTOMERS = `
SELECT DAYNAME(create_date) AS day_name, DATE(create_date) as date,
count(case when gender='F' then 1 end) as female_cnt,
count(case when gender='M' then 1 end) as male_cnt,
COUNT(*) AS total_count
FROM customer
WHERE YEARWEEK(date(create_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
GROUP BY date(create_date), day_name;`;

module.exports = {
  TOTAL_REVENUE,
  TOTAL_CUSTOMERS,
  TOTAL_WEEK_REVENUE,
  TOTAL_WEEK_CUSTOMERS,
};

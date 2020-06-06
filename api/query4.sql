SELECT  SUM(amount)AS total,
SUM(case YEARWEEK(date(payment_date))
 when YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
 then amount
 ELSE 0
 END) AS total_this_week,
 SUM(case date(payment_date)
 when DATE_SUB(CURDATE(),INTERVAL 15 YEAR)
 then amount
 ELSE 0
 end) AS total_today
 FROM payment;
 
 SELECT DAYNAME(payment_date) AS day_name,date(payment_date),
  SUM(amount)
 FROM payment
 WHERE YEARWEEK(date(payment_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) GROUP BY date(payment_date),day_name;
 
 SELECT *, DAYNAME(payment_date) AS day_name,YEARWEEK(date(payment_date)) payment_week,DATE(payment_date),YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
 FROM payment WHERE  YEARWEEK(date(payment_date))=200521 and DAYNAME(payment_date)='Thursday' ;
 



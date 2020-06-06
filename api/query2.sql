SELECT * from
(SELECT DAYNAME(create_date) AS day_name, DATE(create_date) as date,
count(case when gender='F' then 1 end) as female_cnt,
count(case when gender='M' then 1 end) as male_cnt,
COUNT(*) AS total_count
FROM customer
WHERE YEARWEEK(date(create_date))=YEARWEEK( DATE_SUB(CURDATE(),INTERVAL 15 YEAR)) 
GROUP BY date(create_date), day_name) AS week_table;
SELECT co.country, 
count(case when cu.gender='M' then 1 end) as male_cnt,
count(case when cu.gender='F' then 1 end) as female_cnt,
count(*) as total_cnt
FROM customer cu
INNER JOIN address a ON a.address_id = cu.address_id
INNER JOIN city ci ON ci.city_id = a.city_id
INNER JOIN country co ON co.country_id = ci.country_id

GROUP BY co.country;


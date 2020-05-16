SELECT  co.country,ci.city,category.name, count(case when cu.gender='M' then 1 end) as male_cnt,
count(case when cu.gender='F' then 1 end) as female_cnt,
COUNT(*) AS total_count
FROM customer cu
INNER JOIN address a ON a.address_id = cu.address_id
INNER JOIN city ci ON ci.city_id = a.city_id
INNER JOIN country co ON co.country_id = ci.country_id
INNER JOIN rental r ON r.customer_id=cu.customer_id
INNER JOIN inventory ON inventory.inventory_id=r.inventory_id
INNER JOIN film f ON f.film_id=inventory.film_id
INNER JOIN film_category ON film_category.film_id=f.film_id
INNER JOIN category ON category.category_id=film_category.category_id 

GROUP BY  co.country,ci.city,category.name;

 
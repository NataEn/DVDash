SELECT co.country, COUNT(*) AS man
FROM customer cu
INNER JOIN address a ON a.address_id = cu.address_id
INNER JOIN city ci ON ci.city_id = a.city_id
INNER JOIN country co ON co.country_id = ci.country_id
WHERE cu.gender='M'
GROUP BY co.country;


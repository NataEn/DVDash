SELECT co.country, COUNT(*)
FROM customer cu
INNER JOIN address a ON a.address_id = cu.address_id
INNER JOIN city ci ON ci.city_id = a.city_id
INNER JOIN country co ON co.country_id = ci.country_id
GROUP BY co.country;


SELECT co.country, COUNT(*)
FROM customer cu, address a, city ci, country co
WHERE a.address_id = cu.address_id AND ci.city_id = a.city_id AND co.country_id = ci.country_id;
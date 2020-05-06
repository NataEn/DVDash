SELECT distinct s.address_id, f.title
FROM store s
INNER JOIN inventory i ON i.store_id = s.store_id
INNER JOIN film f ON f.film_id = i.film_id
ORDER BY 1,2
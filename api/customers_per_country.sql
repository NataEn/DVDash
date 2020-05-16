SELECT country.country_id, country.country, sum(customers_country.customers) AS customers_per_country
FROM country,
(
  SELECT city.country_id, customers_city.city_id,city.city, COUNT(customers_city.city_id)AS customers
    FROM city,
	 (
         SELECT customer.address_id, address.city_id 
			FROM customer,address
			WHERE customer.address_id=address.address_id
	 ) AS customers_city
	WHERE city.city_id=customers_city.city_id
	GROUP BY customers_city.city_id
) AS customers_country
	
WHERE country.country_id=customers_country.country_id 
GROUP BY country_id;
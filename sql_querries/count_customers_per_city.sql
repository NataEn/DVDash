SELECT city.country_id, customers_city.city_id,city.city, COUNT(customers_city.city_id)AS customers
    FROM city,(
         SELECT customer.address_id, address.city_id 
			FROM customer,address
			WHERE customer.address_id=address.address_id) 
			AS customers_city
	WHERE city.city_id=customers_city.city_id
	GROUP BY customers_city.city_id;

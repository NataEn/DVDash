UPDATE payment p
INNER JOIN 
 (
SELECT p.customer_id,c.create_date, p.payment_id, p.payment_date, row_number() over(PARTITION BY c.customer_id ORDER BY p.payment_id) as rn
FROM customer AS c
INNER JOIN payment AS p ON p.customer_id =c.customer_id
) t
ON p.payment_id = t.payment_id
SET p.payment_date = case t.rn when 1 then t.create_date else DATE_ADD(t.create_date,INTERVAL 7*rn+(6*RAND()) DAY) END;


update customer c
SET c.create_date = c.create_date - INTERVAL 2 YEAR

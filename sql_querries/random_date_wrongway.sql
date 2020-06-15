SET @COUNT=1;
while @COUNT<600 do

SET @random_month =FLOOR(1+RAND()*12);
SET @random_day=FLOOR(1+RAND()*27);
SET @random_date=CONCAT('2005-%',@random_month,'-%',@random_day,' %T');
SET @customer_id=FLOOR(1+RAND()*600);

SELECT @customer_id, @random_date, @random_month, @random_day;
UPDATE customer
SET create_date=DATE_FORMAT(create_date,@random_date)
WHERE customer_id=@customer_id;
SET @COUNT=@COUNT+1;




BEGIN

    SET @COUNT=1;
    while @COUNT<600 do
    SET @random_month =FLOOR(1+RAND()*12);
    SET @random_day=FLOOR(1+RAND()*30);
    SET @random_date=CONCAT('2005-%',@random_month,'-%',@random_day,' %T');
    SET @customer_id=FLOOR(1+RAND()*600);

    UPDATE customer, payment
    SET payment
    .payment_date = customer.create_date
WHERE payment.customer_id = customer.customer_id
order by customer_id, limit 1;

SELECT customer_id, @random_date, @random_month, @random_day;
UPDATE customer
SET create_date=DATE_FORMAT(create_date,@random_date)
WHERE customer_id=@customer_id;
SET @COUNT=@COUNT+1;

END
while;


END


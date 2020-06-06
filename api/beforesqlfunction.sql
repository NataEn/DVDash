SET @COUNT = -1;
CALL `film_in_stock`(1, '1', @COUNT);
SELECT @COUNT;

SELECT * FROM inventory
;
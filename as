-- FUNCTION: public.authenticate(text, text)

-- DROP FUNCTION IF EXISTS public.authenticate(text, text);

CREATE OR REPLACE FUNCTION public.authenticate(
	email text,
	password text)
    RETURNS jwt_token
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
DECLARE
  account public.users;
  secret_key text := 'david'; 
BEGIN
  SELECT a.* INTO account
  FROM public.users AS a
  WHERE a.email = authenticate.email;
  
  IF account.password = password THEN
    RETURN ROW(
      account.email,
      account.role_id
    )::public.jwt_token;
  ELSE
    RETURN NULL;
  END IF;
END;
$BODY$;

ALTER FUNCTION public.authenticate(text, text)
    OWNER TO postgres;



-- Type: jwt_token

-- DROP TYPE IF EXISTS public.jwt_token;

CREATE TYPE public.jwt_token AS
(
	id text,
	token text
);

ALTER TYPE public.jwt_token
    OWNER TO postgres;

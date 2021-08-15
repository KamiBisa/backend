-- postgres
create user kamibisa with password 'kamibisa';
revoke connect on database kamibisa from public;
grant connect on database kamibisa to kamibisa;

revoke all on all tables in schema public from PUBLIC;
grant select, insert, update, delete on all tables in schema public to kamibisa;
alter default privileges for user kamibisa in schema public grant select, insert, update, delete on tables to kamibisa;

alter table users owner to kamibisa;
alter table ewallets owner to kamibisa;
alter table donations owner to kamibisa;
alter table notifications owner to kamibisa;
alter table donation_programs owner to kamibisa;
alter table withdrawals owner to kamibisa;

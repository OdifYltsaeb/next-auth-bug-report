build-dev:
	@docker-compose -f docker-compose-dev.yml build

start-dev:
	@docker-compose -f docker-compose-dev.yml up

stop-dev:
	@docker-compose -f docker-compose-dev.yml down

build-nextjs:
	@docker-compose -f docker-compose-dev.yml run --rm nextjs yarn build

lint:
	@docker-compose -f docker-compose-dev.yml run --rm nextjs yarn lint

stylelint:
	@docker-compose -f docker-compose-dev.yml run --rm nextjs yarn stylelint

fix-ownership:
	@docker-compose -f docker-compose-dev.yml run --rm nextjs chown -R `id -u`:`id -g` ./

gen-i18n:
	@docker-compose -f docker-compose-dev.yml run --rm nextjs yarn extract-i18n
	@make fix-ownership

sitemap:
	@docker-compose -f docker-compose-dev.yml run --rm nextjs yarn sitemap

quality: lint stylelint
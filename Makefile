BIN := node_modules/.bin

all: static/site.css

$(BIN)/lessc $(BIN)/cleancss:
	npm install

%.css: %.less $(BIN)/lessc $(BIN)/cleancss
	$(BIN)/lessc $< | $(BIN)/cleancss --keep-line-breaks --skip-advanced -o $@

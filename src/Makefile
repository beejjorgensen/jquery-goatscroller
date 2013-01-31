NAME=jquery.goatscroller
VERSION=1.0.3
TARGETS=../$(NAME)-$(VERSION).css \
	../$(NAME)-$(VERSION).js \
	../$(NAME)-$(VERSION)-min.css \
	../$(NAME)-$(VERSION)-min.js

all: $(TARGETS)

../$(NAME)-$(VERSION).css: $(NAME).css
	cp $< $@

../$(NAME)-$(VERSION).js: $(NAME).js
	cp $< $@

../$(NAME)-$(VERSION)-min.css: $(NAME).css
	yuicompressor --type css -o $@ $<

../$(NAME)-$(VERSION)-min.js: $(NAME).js
	#yuicompressor --type js -o $@ $<
	#uglifyjs -nc -o $@ $<
	closure --js $< --js_output_file $@

clean:
	rm -f $(TARGETS)

.PHONY: clean


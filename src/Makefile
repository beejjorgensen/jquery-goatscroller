VERSION=1.0
TARGETS=../jquery.goatscroller-$(VERSION).css \
	../jquery.goatscroller-$(VERSION).js \
	../jquery.goatscroller-$(VERSION)-min.css \
	../jquery.goatscroller-$(VERSION)-min.js

all: $(TARGETS)

../jquery.goatscroller-$(VERSION).css: jquery.goatscroller.css
	cp $< $@

../jquery.goatscroller-$(VERSION).js: jquery.goatscroller.js
	cp $< $@

../jquery.goatscroller-$(VERSION)-min.css: jquery.goatscroller.css
	yuicompressor --type css -o $@ $<

../jquery.goatscroller-$(VERSION)-min.js: jquery.goatscroller.js
	#yuicompressor --type js -o $@ $<
	#uglifyjs -nc -o $@ $<
	closure --js $< --js_output_file $@

clean:
	rm -f $(TARGETS)

.PHONY: clean


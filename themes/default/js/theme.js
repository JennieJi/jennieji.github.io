/*! jennieji 2014-05-13 */
+function(a) {
    "use strict";
    var b = function(c, d) {
        this.$element = a(c);
        this.options = a.extend({}, b.DEFAULTS, d);
        this.transitioning = null;
        if (this.options.parent) this.$parent = a(this.options.parent);
        if (this.options.toggle) this.toggle();
    };
    b.DEFAULTS = {
        toggle: true
    };
    b.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height";
    };
    b.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass("in")) return;
        var b = a.Event("show.bs.collapse");
        this.$element.trigger(b);
        if (b.isDefaultPrevented()) return;
        var c = this.$parent && this.$parent.find("> .panel > .in");
        if (c && c.length) {
            var d = c.data("bs.collapse");
            if (d && d.transitioning) return;
            c.collapse("hide");
            d || c.data("bs.collapse", null);
        }
        var e = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[e](0);
        this.transitioning = 1;
        var f = function() {
            this.$element.removeClass("collapsing").addClass("collapse in")[e]("auto");
            this.transitioning = 0;
            this.$element.trigger("shown.bs.collapse");
        };
        if (!a.support.transition) return f.call(this);
        var g = a.camelCase([ "scroll", e ].join("-"));
        this.$element.one(a.support.transition.end, a.proxy(f, this)).emulateTransitionEnd(350)[e](this.$element[0][g]);
    };
    b.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass("in")) return;
        var b = a.Event("hide.bs.collapse");
        this.$element.trigger(b);
        if (b.isDefaultPrevented()) return;
        var c = this.dimension();
        this.$element[c](this.$element[c]())[0].offsetHeight;
        this.$element.addClass("collapsing").removeClass("collapse").removeClass("in");
        this.transitioning = 1;
        var d = function() {
            this.transitioning = 0;
            this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse");
        };
        if (!a.support.transition) return d.call(this);
        this.$element[c](0).one(a.support.transition.end, a.proxy(d, this)).emulateTransitionEnd(350);
    };
    b.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };
    var c = a.fn.collapse;
    a.fn.collapse = function(c) {
        return this.each(function() {
            var d = a(this);
            var e = d.data("bs.collapse");
            var f = a.extend({}, b.DEFAULTS, d.data(), typeof c == "object" && c);
            if (!e && f.toggle && c == "show") c = !c;
            if (!e) d.data("bs.collapse", e = new b(this, f));
            if (typeof c == "string") e[c]();
        });
    };
    a.fn.collapse.Constructor = b;
    a.fn.collapse.noConflict = function() {
        a.fn.collapse = c;
        return this;
    };
    a(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(b) {
        var c = a(this), d;
        var e = c.attr("data-target") || b.preventDefault() || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "");
        var f = a(e);
        var g = f.data("bs.collapse");
        var h = g ? "toggle" : c.data();
        var i = c.attr("data-parent");
        var j = i && a(i);
        if (!g || !g.transitioning) {
            if (j) j.find('[data-toggle=collapse][data-parent="' + i + '"]').not(c).addClass("collapsed");
            c[f.hasClass("in") ? "addClass" : "removeClass"]("collapsed");
        }
        f.collapse(h);
    });
}(jQuery);

+function(a) {
    "use strict";
    function b(c, d) {
        var e;
        var f = a.proxy(this.process, this);
        this.$element = a(c).is("body") ? a(window) : a(c);
        this.$body = a("body");
        this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", f);
        this.options = a.extend({}, b.DEFAULTS, d);
        this.selector = (this.options.target || (e = a(c).attr("href")) && e.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a";
        this.offsets = a([]);
        this.targets = a([]);
        this.activeTarget = null;
        this.refresh();
        this.process();
    }
    b.DEFAULTS = {
        offset: 10
    };
    b.prototype.refresh = function() {
        var b = this.$element[0] == window ? "offset" : "position";
        this.offsets = a([]);
        this.targets = a([]);
        var c = this;
        var d = this.$body.find(this.selector).map(function() {
            var d = a(this);
            var e = d.data("target") || d.attr("href");
            var f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [ [ f[b]().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), e ] ] || null;
        }).sort(function(a, b) {
            return a[0] - b[0];
        }).each(function() {
            c.offsets.push(this[0]);
            c.targets.push(this[1]);
        });
    };
    b.prototype.process = function() {
        var a = this.$scrollElement.scrollTop() + this.options.offset;
        var b = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
        var c = b - this.$scrollElement.height();
        var d = this.offsets;
        var e = this.targets;
        var f = this.activeTarget;
        var g;
        if (a >= c) {
            return f != (g = e.last()[0]) && this.activate(g);
        }
        if (f && a <= d[0]) {
            return f != (g = e[0]) && this.activate(g);
        }
        for (g = d.length; g--; ) {
            f != e[g] && a >= d[g] && (!d[g + 1] || a <= d[g + 1]) && this.activate(e[g]);
        }
    };
    b.prototype.activate = function(b) {
        this.activeTarget = b;
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]';
        var d = a(c).parents("li").addClass("active");
        if (d.parent(".dropdown-menu").length) {
            d = d.closest("li.dropdown").addClass("active");
        }
        d.trigger("activate.bs.scrollspy");
    };
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function(c) {
        return this.each(function() {
            var d = a(this);
            var e = d.data("bs.scrollspy");
            var f = typeof c == "object" && c;
            if (!e) d.data("bs.scrollspy", e = new b(this, f));
            if (typeof c == "string") e[c]();
        });
    };
    a.fn.scrollspy.Constructor = b;
    a.fn.scrollspy.noConflict = function() {
        a.fn.scrollspy = c;
        return this;
    };
    a(window).on("load", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            b.scrollspy(b.data());
        });
    });
}(jQuery);
window.OnlineWebFonts_Animations =
  window.OnlineWebFonts_Animations ||
  function (t) {
    return 'object' != typeof t
      ? this
      : {
          Config: {},
          Index: { Key: 'www.onlinewebfonts.com', Id: null, Data: { Config: { Width: 3, Opacity: 1, StrokeDot: !0, Sequential: !0, Display: !0, Reverse: !1, Color: '#000000', Animate: 'Linear' } }, Svg: {}, Path: [], Div: null, An: null, Dom: null, Pause: !1, Complete: null, Status: null },
          Run: function (t) {
            this.Config = this.Index;
            var n = this.Config,
              e = n.Data;
            for (var i in e.Config) null != t.Data.Config[i] && (e.Config[i] = t.Data.Config[i]);
            return (n.Id = t.Id), (n.Data.Line = t.Data.Line), (n.Data.Box = t.Data.Box), 'function' == typeof t.Complete && (n.Complete = t.Complete), 'function' == typeof t.Status && (n.Status = t.Status), this.Append().PathAppend(), this;
          },
          Play: function () {
            var t = this;
            return (
              t.Stop(),
              (t.Config.An = requestAnimationFrame(function (n) {
                t.Update(n);
              })),
              this
            );
          },
          Pause: function () {
            return this.Config.Pause || ((this.Config.Pause = !0), cancelAnimationFrame(this.Config.An)), this;
          },
          Resume: function () {
            var t = this;
            return (
              t.Config.Pause &&
                ((t.Config.Pause = !1),
                requestAnimationFrame(function (n) {
                  t.ResumeUpdate(n);
                })),
              this
            );
          },
          Stop: function () {
            return (this.Config.Div.innerHTML = ''), this.Append().PathAppend(), cancelAnimationFrame(this.Config.An), this;
          },
          ResumeUpdate: function (t) {
            var n = this,
              e = n.Config.Svg.Time.Data;
            (e.Start = t - e.Elapsed),
              requestAnimationFrame(function (t) {
                n.Update(t);
              });
          },
          Update: function (t) {
            var n = this,
              e = n.Config,
              i = e.Data,
              r = e.Svg.Time.Data;
            if ((0 == r.Start && (r.Start = t), (r.Elapsed = t - r.Start), (r.Progress = n.Progress(r.Total, r.Start, r.Elapsed, i.Config.Animate)), n.UpdatePath(), r.Progress < 1)) {
              if (null !== e.Status) {
                var a = Math.round(100 * r.Progress);
                e.Status(99 == a ? 100 : a, e.Id);
              }
              n.Config.An = requestAnimationFrame(function (t) {
                n.Update(t);
              });
            } else null !== e.Complete && e.Complete();
          },
          UpdatePath: function () {
            for (var t = this.Config.Svg.Time.Path, n = 0; n < this.Config.Dom.length; n++) {
              var e = this.PathElapsed(n);
              (t[n].Progress = this.Progress(1, 0, e, this.Config.Data.Config.Animate)), this.SetLine(n);
            }
          },
          SetLine: function (t) {
            var n = this.Config.Svg,
              e = n.Time.Path,
              i = this.Config.Dom,
              r = e[t].Progress * n.Path.Length[t];
            if (this.Config.Data.Config.Reverse) var a = -n.Path.Length[t] + r;
            else a = n.Path.Length[t] - r;
            i[t].style.strokeDashoffset = a;
          },
          PathElapsed: function (t) {
            var n,
              e = this.Config.Svg.Time,
              i = e.Path[t];
            return e.Data.Progress > i.StartPro && e.Data.Progress < i.StartPro + i.Duration ? (n = (e.Data.Progress - i.StartPro) / i.Duration) : e.Data.Progress >= i.StartPro + i.Duration ? (n = 1) : e.Data.Progress <= i.StartPro && (n = 0), n;
          },
          Progress: function (t, n, e, i) {
            var r;
            return e > 0 && e < t ? (r = i ? this.Ease[i](e, 0, 1, t) : e / t) : e >= t ? (r = 1) : e <= n && (r = 0), r;
          },
          PathAppend: function () {
            var t = this.Config,
              n = t.Data,
              e = t.Svg.Time;
            e.Path = [];
            var i = n.Config.Reverse ? e.Data.Total : 0;
            for (var r in n.Line) {
              var a = parseInt(n.Line[r].Duration),
                o = a / e.Data.Total;
              n.Config.Reverse ? (i -= a) : (i = n.Config.Sequential ? e.Data.Delay : 0);
              var u = i / e.Data.Total;
              (e.Data.Delay += a), (e.Path[r] = { Start: i, Duration: o, StartPro: u });
            }
          },
          Append: function () {
            var t = this.Config,
              n = t.Data,
              e = t.Svg,
              i = this.SVGElement();
            (e.Path = {}), (e.Time = {}), (e.Time.Data = { Start: 0, Elapsed: 0, Total: 0, Duration: 0, Progress: 0, Delay: 0 }), (e.Path.Length = []);
            var r = 0;
            for (var a in n.Line) {
              var o = { 'fill-opacity': '0', 'stroke-linecap': n.Config.StrokeDot ? 'round' : 'butt', 'stroke-linejoin': 'round', stroke: n.Line[a].Color ? n.Line[a].Color : n.Config.Color, 'stroke-opacity': n.Config.StrokeDot ? n.Config.Opacity : '0', 'stroke-width': n.Line[a].Width ? n.Line[a].Width : n.Config.Width, d: n.Line[a].Path },
                u = document.createElementNS('http://www.w3.org/2000/svg', 'path');
              for (var s in o) u.setAttribute(s, o[s]);
              var f = Math.ceil(u.getTotalLength());
              (e.Path.Length[a] = f), u.setAttribute('style', 'stroke-dasharray:' + f + ',' + f + ';stroke-dashoffset:' + (n.Config.Display ? '0' : f) + ';'), i.appendChild(u), t.Path.push(u), 0 == n.Line[a].Duration && (n.Line[a].Duration = this.GetPathDuration(n.Line[a].Path)), n.Config.Sequential ? (r += parseInt(n.Line[a].Duration)) : parseInt(n.Line[a].Duration) > r && (r = parseInt(n.Line[a].Duration));
            }
            return (e.Time.Data.Total = r), (t.Div = document.querySelector(t.Id)), t.Div.appendChild(i), (t.Dom = t.Div.children[0].childNodes), this;
          },
          GetPathDuration: function (t) {
            var n = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            return n.setAttribute('d', t), Math.ceil(n.getTotalLength());
          },
          SVGElement: function (t) {
            var n = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            n.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            var e = this.Config.Data.Box.Width,
              i = this.Config.Data.Box.Height;
            return n.setAttribute('viewBox', '0 0 ' + e + ' ' + i), n;
          },
          Ease: {
            Linear: function (t, n, e, i) {
              return (e * t) / i + n;
            },
            InQuad: function (t, n, e, i) {
              return e * (t /= i) * t + n;
            },
            OutQuad: function (t, n, e, i) {
              return -e * (t /= i) * (t - 2) + n;
            },
            InOutQuad: function (t, n, e, i) {
              return (t /= i / 2) < 1 ? (e / 2) * t * t + n : (-e / 2) * (--t * (t - 2) - 1) + n;
            },
            InCubic: function (t, n, e, i) {
              return e * (t /= i) * t * t + n;
            },
            OutCubic: function (t, n, e, i) {
              return e * ((t = t / i - 1) * t * t + 1) + n;
            },
            InOutCubic: function (t, n, e, i) {
              return (t /= i / 2) < 1 ? (e / 2) * t * t * t + n : (e / 2) * ((t -= 2) * t * t + 2) + n;
            },
            InQuart: function (t, n, e, i) {
              return e * (t /= i) * t * t * t + n;
            },
            OutQuart: function (t, n, e, i) {
              return -e * ((t = t / i - 1) * t * t * t - 1) + n;
            },
            InOutQuart: function (t, n, e, i) {
              return (t /= i / 2) < 1 ? (e / 2) * t * t * t * t + n : (-e / 2) * ((t -= 2) * t * t * t - 2) + n;
            },
            InQuint: function (t, n, e, i) {
              return e * (t /= i) * t * t * t * t + n;
            },
            OutQuint: function (t, n, e, i) {
              return e * ((t = t / i - 1) * t * t * t * t + 1) + n;
            },
            InOutQuint: function (t, n, e, i) {
              return (t /= i / 2) < 1 ? (e / 2) * t * t * t * t * t + n : (e / 2) * ((t -= 2) * t * t * t * t + 2) + n;
            },
            InSine: function (t, n, e, i) {
              return -e * Math.cos((t / i) * (Math.PI / 2)) + e + n;
            },
            OutSine: function (t, n, e, i) {
              return e * Math.sin((t / i) * (Math.PI / 2)) + n;
            },
            InOutSine: function (t, n, e, i) {
              return (-e / 2) * (Math.cos((Math.PI * t) / i) - 1) + n;
            },
            InExpo: function (t, n, e, i) {
              return 0 == t ? n : e * Math.pow(2, 10 * (t / i - 1)) + n;
            },
            OutExpo: function (t, n, e, i) {
              return t == i ? n + e : e * (1 - Math.pow(2, (-10 * t) / i)) + n;
            },
            InOutExpo: function (t, n, e, i) {
              return 0 == t ? n : t == i ? n + e : (t /= i / 2) < 1 ? (e / 2) * Math.pow(2, 10 * (t - 1)) + n : (e / 2) * (2 - Math.pow(2, -10 * --t)) + n;
            },
            InCirc: function (t, n, e, i) {
              return -e * (Math.sqrt(1 - (t /= i) * t) - 1) + n;
            },
            OutCirc: function (t, n, e, i) {
              return e * Math.sqrt(1 - (t = t / i - 1) * t) + n;
            },
            InOutCirc: function (t, n, e, i) {
              return (t /= i / 2) < 1 ? (-e / 2) * (Math.sqrt(1 - t * t) - 1) + n : (e / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
            },
            InElastic: function (t, n, e, i) {
              var r = 1.70158,
                a = 0,
                o = e;
              if (0 == t) return n;
              if (1 == (t /= i)) return n + e;
              if ((a || (a = 0.3 * i), o < Math.abs(e))) {
                o = e;
                r = a / 4;
              } else r = (a / (2 * Math.PI)) * Math.asin(e / o);
              return -o * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * i - r) * (2 * Math.PI)) / a) + n;
            },
            OutElastic: function (t, n, e, i) {
              var r = 1.70158,
                a = 0,
                o = e;
              if (0 == t) return n;
              if (1 == (t /= i)) return n + e;
              if ((a || (a = 0.3 * i), o < Math.abs(e))) {
                o = e;
                r = a / 4;
              } else r = (a / (2 * Math.PI)) * Math.asin(e / o);
              return o * Math.pow(2, -10 * t) * Math.sin(((t * i - r) * (2 * Math.PI)) / a) + e + n;
            },
            InOutElastic: function (t, n, e, i) {
              var r = 1.70158,
                a = 0,
                o = e;
              if (0 == t) return n;
              if (2 == (t /= i / 2)) return n + e;
              if ((a || (a = i * (0.3 * 1.5)), o < Math.abs(e))) {
                o = e;
                r = a / 4;
              } else r = (a / (2 * Math.PI)) * Math.asin(e / o);
              return t < 1 ? o * Math.pow(2, 10 * (t -= 1)) * Math.sin(((t * i - r) * (2 * Math.PI)) / a) * -0.5 + n : o * Math.pow(2, -10 * (t -= 1)) * Math.sin(((t * i - r) * (2 * Math.PI)) / a) * 0.5 + e + n;
            },
            InBack: function (t, n, e, i, r) {
              return null == r && (r = 1.70158), e * (t /= i) * t * ((r + 1) * t - r) + n;
            },
            OutBack: function (t, n, e, i, r) {
              return null == r && (r = 1.70158), e * ((t = t / i - 1) * t * ((r + 1) * t + r) + 1) + n;
            },
            InOutBack: function (t, n, e, i, r) {
              return null == r && (r = 1.70158), (t /= i / 2) < 1 ? (e / 2) * (t * t * ((1 + (r *= 1.525)) * t - r)) + n : (e / 2) * ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) + n;
            },
            InBounce: function (t, n, e, i) {
              return e - this.OutBounce(i - t, 0, e, i) + n;
            },
            OutBounce: function (t, n, e, i) {
              return (t /= i) < 1 / 2.75 ? e * (7.5625 * t * t) + n : t < 2 / 2.75 ? e * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + n : t < 2.5 / 2.75 ? e * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + n : e * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + n;
            },
            InOutBounce: function (t, n, e, i) {
              return t < i / 2 ? 0.5 * this.InBounce(2 * t, 0, e, i) + n : 0.5 * this.OutBounce(2 * t - i, 0, e, i) + 0.5 * e + n;
            }
          }
        }.Run(t);
  };
window.OnlineWebFonts_Com =
  window.OnlineWebFonts_Com ||
  function (t) {
    return new OnlineWebFonts_Animations(t);
  };
if (typeof Object.assign != 'function') {
  Object.assign = function (e) {
    e = Object(e);
    for (var i = 1; i < arguments.length; i++) {
      var s = arguments[i];
      if (s != null) {
        for (var k in s) {
          if (Object.prototype.hasOwnProperty.call(s, k)) {
            e[k] = s[k];
          }
        }
      }
    }
    return e;
  };
}
window.__Animations = Object.assign(window.__Animations || {}, {
  84264: {
    Line: [
      { Path: 'M70.1,86.8l7.9-2.4c-3.2-9.8-17-15.6-17-15.6l-5.6,7.1c-2-2.3,0-8.8,0-8.8c-12.9-5.4-24-2.6-24-2.6l-1.8,7.4L26,66.2c-6.7,1.1-12.9,8.8-12.9,8.8c-7.9,13.4,1.8,30,1.8,30c-2.3-29.2,15.9-31.6,27.7-28.8C54.3,79,54.3,90.9,54.3,90.9c-1.3-4.9-8.1-11.3-15.1-11.2c-7,0.1-9.2,12.5-9.2,12.5c7.5-3.2,14,1.4,14,1.4c-11.2,0.9-11.6,5.7-11.6,5.7c-3.7,17.2,26.3,16,26.3,16l1.5-12.8l5.6,12.8c17.8-2,17.8-25.4,17.8-25.4L70.1,86.8z', Duration: 0, Width: '3', Color: '#795458' },
      { Path: 'M242.9,75.1c0,0-6.2-7.7-12.9-8.8l-3.8,5.7l-1.8-7.4c0,0-11.2-2.9-24.1,2.6c0,0,2,6.6,0,8.8l-5.6-7.1c0,0-13.8,5.8-17,15.6l7.9,2.4L172.1,90c0,0,0,23.4,17.9,25.4l5.6-12.8l1.5,12.8c0,0,30.2,1.2,26.4-16c0,0-0.4-4.9-11.7-5.7c0,0,6.5-4.7,14.1-1.4c0,0-2.2-12.4-9.3-12.5s-13.9,6.3-15.2,11.2c0,0,0-12,11.8-14.7c11.8-2.8,30.2-0.4,27.8,28.8C241.1,105.1,250.8,88.5,242.9,75.1z', Duration: 0, Width: '3', Color: '#795458' },
      { Path: 'M169.6,107.9c0,0-8.5,8.3-20.5,7.4c0,0,14.8-5,17.1-14.3c2.3-9.3-1.8-14.3,5.3-22.1s14.8-15,31.4-17.1c0,0-10.5-7.3-22.1-9c0,0-1.3,8.7,0,11.7c0,0-6.9-8.7-7.3-11.7c0,0-13.3,2.9-20.8,9.7c0,0,4.4,10.9,11.2,14c0,0-15.5-6.6-18.1-10.3c0,0-13.9,9.6-17.1,17.1c0,0-10.5-13.7-18-17.4c0,0-15.5,8.6-17.4,11.6c-1.9,3,7.2-14.1,10.5-17c0,0-14.2-6.3-21.3-6.6c0,0-6.4,6.6-7.6,9.8c0,0-1.9-6.2-0.7-11c0,0-17.8,3.1-19.4,8.3c0,0,38.3,5.7,35.4,40.5c0,0,10.5,11.2,16.1,13.7c0,0-11.1-0.6-19.6-6.6c0,0-8.3,5.9-8.5,9.4c-0.2,3.8,2,12,5.3,13.1c0,0,0.2-8.6,2.9-10.1c0,0-0.8,11.9,16.6,17.9c13.3,4.6,12.9,16.2,12.1,18.4c0,0-7.8-8-12.7-9.1c-4.9-1.1-9.2-3-12.5-7.4c0,0,1,9.7,5.7,18.8c4.7,9.1,20.1,36,21.2,40.7c0,0,10.5,5.9,24.5,0c0,0,8.8-20.5,17.9-33.3c9.2-12.7,7-22.8,6.6-26.2c0,0-6.2,7.6-12.5,9.3c-6.2,1.7-11.3,6.5-11.7,7.6c0,0-0.8-9.1,6.6-15.6c7.4-6.5,17-4.2,20.9-18.8c0,0,4,5.9,2.8,8.6c-1.2,2.7,6.3-7.6,4.5-16.1C176.6,116.1,174.7,109.5,169.6,107.9z', Duration: 0, Width: '3', Color: '#795458' }
    ],
    Box: { Width: '256', Height: '256' },
    Config: { Width: '3', Opacity: 1, Sequential: true, Color: '#000000', Animate: 'Linear', Reverse: false }
  }
});

const STATS_DATA = {
  "distributions": [
    {
      "id": "binomial",
      "name": "二項分布 (Binomial Distribution)",
      "type": "discrete",
      "formula": "P(X=k) = \\binom{n}{k}p^k(1-p)^{n-k}",
      "mean": "np",
      "variance": "np(1-p)",
      "pgf": "(pt + 1-p)^n",
      "description": "成功確率 p の独立な試行を n 回行ったときの成功回数 k の分布。"
    },
    {
      "id": "poisson",
      "name": "ポアソン分布 (Poisson Distribution)",
      "type": "discrete",
      "formula": "P(X=k) = \\frac{\\lambda^k e^{-\\lambda}}{k!}",
      "mean": "\\lambda",
      "variance": "\\lambda",
      "pgf": "e^{\\lambda(t-1)}",
      "description": "単位時間または単位空間に平均 λ 回発生する事象の回数 k の分布。"
    },
    {
      "id": "hypergeometric",
      "name": "超幾何分布 (Hypergeometric Distribution)",
      "type": "discrete",
      "formula": "P(X=k) = \\frac{\\binom{M}{k}\\binom{N-M}{n-k}}{\\binom{N}{n}}",
      "mean": "n \\frac{M}{N}",
      "variance": "n \\frac{M}{N} \\frac{N-M}{N} \\frac{N-n}{N-1}",
      "pgf": "F(-n, -M; N-M-n+1; t) \\text{（超幾何関数）}",
      "description": "有限集団から非復元抽出したときの成功回数の分布。"
    },
    {
      "id": "geometric",
      "name": "幾何分布 (Geometric Distribution)",
      "type": "discrete",
      "formula": "P(X=k) = p(1-p)^{k-1}",
      "mean": "1/p",
      "variance": "(1-p)/p^2",
      "pgf": "\\frac{pt}{1-(1-p)t}",
      "description": "初めて成功するまでの試行回数 k の分布。"
    },
    {
      "id": "neg_binomial",
      "name": "負の二項分布 (Negative Binomial Distribution)",
      "type": "discrete",
      "formula": "P(X=k) = \\binom{k-1}{r-1} p^r (1-p)^{k-r}",
      "mean": "r/p",
      "variance": "r(1-p)/p^2",
      "pgf": "\\left( \\frac{pt}{1-(1-p)t} \\right)^r",
      "description": "r 回成功するまでの試行回数 k の分布。"
    },
    {
      "id": "multinomial",
      "name": "多項分布 (Multinomial Distribution)",
      "type": "discrete",
      "formula": "P(k_1, \\dots, k_m) = \\frac{n!}{k_1! \\dots k_m!} p_1^{k_1} \\dots p_m^{k_m}",
      "mean": "E[X_i] = np_i",
      "variance": "Var(X_i) = np_i(1-p_i)",
      "pgf": "(\\sum p_i t_i)^n",
      "description": "二項分布を多変量に拡張した分布。"
    },
    {
      "id": "normal",
      "name": "正規分布 (Normal Distribution)",
      "type": "continuous",
      "formula": "f(x) = \\frac{1}{\\sqrt{2\\pi\\sigma^2}} \\exp\\left(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\right)",
      "mean": "\\mu",
      "variance": "\\sigma^2",
      "mgf": "\\exp\\left(\\mu t + \\frac{\\sigma^2 t^2}{2}\\right)",
      "description": "平均 μ、分散 σ² を持つ連続確率分布。"
    },
    {
      "id": "exponential",
      "name": "指数分布 (Exponential Distribution)",
      "type": "continuous",
      "formula": "f(x) = \\lambda e^{-\\lambda x}",
      "mean": "1/\\lambda",
      "variance": "1/\\lambda^2",
      "mgf": "\\frac{\\lambda}{\\lambda-t}",
      "description": "特定の事象が発生するまでの時間間隔を表す分布。"
    },
    {
      "id": "gamma_dist",
      "name": "ガンマ分布 (Gamma Distribution)",
      "type": "continuous",
      "formula": "f(x) = \\frac{\\beta^\\alpha}{\\Gamma(\\alpha)} x^{\\alpha-1} e^{-\\beta x}",
      "mean": "\\alpha/\\beta",
      "variance": "\\alpha/\\beta^2",
      "mgf": "(1-t/\\beta)^{-\\alpha}",
      "description": "形状パラメータ α と尺度パラメータ β を持つ連続確率分布。"
    },
    {
      "id": "beta_dist",
      "name": "ベータ分布 (Beta Distribution)",
      "type": "continuous",
      "formula": "f(x) = \\frac{x^{\\alpha-1}(1-x)^{\\beta-1}}{B(\\alpha, \\beta)}",
      "mean": "\\alpha / (\\alpha + \\beta)",
      "variance": "\\frac{\\alpha\\beta}{(\\alpha+\\beta)^2(\\alpha+\\beta+1)}",
      "mgf": "1 + \\sum_{k=1}^{\\infty} (\\prod_{r=0}^{k-1} \\frac{\\alpha+r}{\\alpha+\\beta+r}) \\frac{t^k}{k!}",
      "description": "[0, 1] 区間で定義される連続確率分布。"
    },
    {
      "id": "cauchy",
      "name": "コーシー分布 (Cauchy Distribution)",
      "type": "continuous",
      "formula": "f(x) = \\frac{1}{\\pi \\gamma [1 + ((x-x_0)/\\gamma)^2]}",
      "mean": "\\text{定義されない}",
      "variance": "\\text{定義されない}",
      "mgf": "\\text{存在しない}",
      "description": "期待値や分散が定義されない、裾の重い分布。"
    },
    {
      "id": "lognormal",
      "name": "対数正規分布 (Lognormal Distribution)",
      "type": "continuous",
      "formula": "f(x) = \\frac{1}{x \\sigma \\sqrt{2\\pi}} \\exp\\left(-\\frac{(\\ln x - \\mu)^2}{2\\sigma^2}\\right)",
      "mean": "e^{\\mu + \\sigma^2/2}",
      "variance": "e^{2\\mu + \\sigma^2}(e^{\\sigma^2} - 1)",
      "mgf": "\\text{有限の範囲では存在しない}",
      "description": "変数の対数が正規分布に従う分布。"
    },
    {
      "id": "weibull",
      "name": "ワイブル分布 (Weibull Distribution)",
      "type": "continuous",
      "formula": "f(x) = \\frac{k}{\\lambda} (\\frac{x}{\\lambda})^{k-1} e^{-(x/\\lambda)^k}",
      "mean": "\\lambda \\Gamma(1+1/k)",
      "variance": "\\lambda^2 [\\Gamma(1+2/k) - (\\Gamma(1+1/k))^2]",
      "mgf": "\\sum_{n=0}^{\\infty} \\frac{t^n \\lambda^n}{n!} \\Gamma(1+n/k)",
      "description": "信頼性工学や寿命解析でよく使われる分布。"
    },
    {
      "id": "logistic",
      "name": "ロジスティック分布 (Logistic Distribution)",
      "type": "continuous",
      "formula": "f(x) = \\frac{e^{-(x-\\mu)/s}}{s(1+e^{-(x-\\mu)/s})^2}",
      "mean": "\\mu",
      "variance": "\\frac{s^2 \\pi^2}{3}",
      "mgf": "e^{\\mu t} B(1-st, 1+st)",
      "description": "累積分布関数がロジスティック関数となる分布。"
    },
    {
      "id": "multivariate_normal",
      "name": "多変量正規分布 (Multivariate Normal)",
      "type": "continuous",
      "formula": "f(\\mathbf{x}) = \\frac{1}{\\sqrt{(2\\pi)^k |\\Sigma|}} \\exp(-\\frac{1}{2}(\\mathbf{x}-\\boldsymbol{\mu})^T \\Sigma^{-1} (\\mathbf{x}-\\boldsymbol{\mu}))",
      "mean": "\\boldsymbol{\mu}",
      "variance": "\\Sigma (分散共分散行列)",
      "mgf": "\\exp(\\mathbf{t}^T \\boldsymbol{\mu} + \\frac{1}{2} \\mathbf{t}^T \\Sigma \\mathbf{t})",
      "description": "正規分布を多次元に拡張した分布。"
    },
    {
      "id": "chi_square",
      "name": "カイ二乗分布 (Chi-square Distribution)",
      "type": "continuous",
      "formula": "f(x) = \\frac{1}{2^{n/2}\\Gamma(n/2)} x^{n/2-1} e^{-x/2}",
      "mean": "n",
      "variance": "2n",
      "mgf": "(1-2t)^{-n/2}",
      "description": "独立な標準正規分布の二乗和が従う分布。"
    },
    {
      "id": "t_dist",
      "name": "t分布 (t-distribution)",
      "type": "continuous",
      "formula": "f(t) = \\frac{\\Gamma(\\frac{n+1}{2})}{\\sqrt{n\\pi}\\Gamma(\\frac{n}{2})} (1+\\frac{t^2}{n})^{-\\frac{n+1}{2}}",
      "mean": "0 \\quad (n>1)",
      "variance": "n/(n-2) \\quad (n>2)",
      "mgf": "\\text{存在しない}",
      "description": "標本平均の分布に基づく検定に使われる分布。"
    },
    {
      "id": "f_dist",
      "name": "F分布 (F-distribution)",
      "type": "continuous",
      "formula": "f(x) = \\frac{\\sqrt{\\frac{(n_1 x)^{n_1} n_2^{n_2}}{(n_1 x + n_2)^{n_1+n_2}}}}{x B(n_1/2, n_2/2)}",
      "mean": "n_2 / (n_2 - 2)",
      "variance": "\\text{複雑（n2 > 4で定義）}",
      "mgf": "\\text{存在しない}",
      "description": "分散分析や分散の比の検定に使われる分布。"
    }
  ],
  "functions": [
    {
      "id": "weak_law",
      "name": "大数の弱法則",
      "formula": "P(|\\bar{X}_n - \\mu| > \\epsilon) \\to 0 \\quad (n \\to \\infty)",
      "description": "標本平均は母平均 μ に確率収束するという法則。"
    },
    {
      "id": "clt",
      "name": "中心極限定理 (CLT)",
      "formula": "Z = \\frac{\\bar{X}_n - \\mu}{\\sigma/\\sqrt{n}} \\to N(0, 1)",
      "description": "標本平均の分布が n が大きくなると正規分布に近づくという定理。"
    },
    {
      "id": "variable_transformation",
      "name": "確率密度関数の変数変換",
      "formula": "f_Y(y) = f_X(g^{-1}(y)) \\left| \\frac{d}{dy} g^{-1}(y) \\right|",
      "description": "変数変換 Y = g(X) の密度関数を求める公式（ヤコビアン）。"
    },
    {
      "id": "gamma_function",
      "name": "ガンマ関数",
      "formula": "\\Gamma(z) = \\int_0^\\infty x^{z-1} e^{-x} dx",
      "description": "階乗を一般化した関数。"
    },
    {
      "id": "beta_function",
      "name": "ベータ関数",
      "formula": "B(x, y) = \\int_0^1 t^{x-1}(1-t)^{y-1} dt",
      "description": "二項係数を一般化したような関数。"
    },
    {
      "id": "standard_error",
      "name": "標本確率の標準誤差 (SE)",
      "formula": "SE = \\frac{\\sigma}{\\sqrt{n}}",
      "description": "標本平均の分布の標準偏差。推定の精度を表す。"
    }
  ]
};

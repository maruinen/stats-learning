/**
 * 静的なクイズデータ (全108問)
 * 各確率分布: 最低5問
 * 各定理/関数: 最低3問
 */
const QUIZ_DATA = [
    // --- 二項分布 (binomial) ---
    { id: "q_bin_01", itemId: "binomial", question: "二項分布 B(n, p) の期待値 (Mean) はどれですか？", options: ["\\( np \\)", "\\( np(1-p) \\)", "\\( p \\)", "\\( n/p \\)"], answerIndex: 0, explanation: "二項分布の期待値は np です。" },
    { id: "q_bin_02", itemId: "binomial", question: "二項分布 B(n, p) の分散 (Variance) はどれですか？", options: ["\\( np \\)", "\\( np(1-p) \\)", "\\( npq^2 \\)", "\\( n^2 p \\)"], answerIndex: 1, explanation: "二項分布の分散は np(1-p) です。" },
    { id: "q_bin_03", itemId: "binomial", question: "二項分布 B(n, p) の確率母関数 (PGF) はどれですか？", options: ["\\( (pt + 1-p)^n \\)", "\\( (pe^t + 1-p)^n \\)", "\\( e^{\\lambda(t-1)} \\)", "\\( \\frac{pt}{1-(1-p)t} \\)"], answerIndex: 0, explanation: "二項分布の確率母関数は G(t) = (pt + 1-p)^n です。" },
    { id: "q_bin_04", itemId: "binomial", question: "二項分布の確率関数 P(X=k) の正しい式はどれですか？", options: ["\\( \\binom{n}{k}p^k(1-p)^{n-k} \\)", "\\( p(1-p)^{k-1} \\)", "\\( \\frac{\\lambda^k e^{-\\lambda}}{k!} \\)", "\\( \\binom{k-1}{r-1}p^r(1-p)^{k-r} \\)"], answerIndex: 0, explanation: "n回中k回成功する確率は \\( \\binom{n}{k}p^k(1-p)^{n-k} \\) です。" },
    { id: "q_bin_05", itemId: "binomial", question: "二項分布が成立するための条件「ベルヌーイ試行」に含まれないものは？", options: ["各試行の結果が前の試行に依存する", "各試行の結果は成功か失敗の2通り", "成功確率 p は常に一定である", "各試行は独立である"], answerIndex: 0, explanation: "ベルヌーイ試行は「独立」である必要があり、依存してはいけません。" },

    // --- ポアソン分布 (poisson) ---
    { id: "q_poi_01", itemId: "poisson", question: "ポアソン分布の期待値と分散の関係について正しいものはどれですか？", options: ["期待値 = 分散", "期待値 > 分散", "期待値 < 分散", "特に関係はない"], answerIndex: 0, explanation: "ポアソン分布では期待値も分散も λ となり、一致します。" },
    { id: "q_poi_02", itemId: "poisson", question: "ポアソン分布の確率母関数 (PGF) はどれですか？", options: ["\\( e^{\\lambda(t-1)} \\)", "\\( e^{\\lambda(e^t-1)} \\)", "\\( (pt + 1-p)^n \\)", "\\( \\frac{1}{1-\\lambda(t-1)} \\)"], answerIndex: 0, explanation: "ポアソン分布の確率母関数は \\( e^{\\lambda(t-1)} \\) です。" },
    { id: "q_poi_03", itemId: "poisson", question: "ポアソン分布の確率関数 P(X=k) はどれですか？", options: ["\\( \\frac{\\lambda^k e^{-\\lambda}}{k!} \\)", "\\( \\frac{\\lambda^k}{k!} \\)", "\\( \\lambda e^{-\\lambda k} \\)", "\\( e^{-\\lambda} \\)"], answerIndex: 0, explanation: "ポアソン分布の確率関数は \\( \\frac{\\lambda^k e^{-\\lambda}}{k!} \\) です。" },
    { id: "q_poi_04", itemId: "poisson", question: "二項分布 B(n, p) において、nが大きくpが小さいとき、np=λ とおくとどの分布で近似できますか？", options: ["ポアソン分布 Po(λ)", "正規分布", "幾何分布", "指数分布"], answerIndex: 0, explanation: "これは「ポアソンの小数の法則」と呼ばれます。" },
    { id: "q_poi_05", itemId: "poisson", question: "独立な X ~ Po(λ1), Y ~ Po(λ2) の和 X+Y はどの分布に従いますか？", options: ["Po(λ1 + λ2)", "Po(λ1 * λ2)", "正規分布", "二項分布"], answerIndex: 0, explanation: "ポアソン分布には再生性があり、パラメータの和のポアソン分布に従います。" },

    // --- 超幾何分布 (hypergeometric) ---
    { id: "q_hyp_01", itemId: "hypergeometric", question: "超幾何分布と二項分布の最大の違いは何ですか？", options: ["非復元抽出か復元抽出か", "連続か離散か", "期待値の有無", "パラメータの数"], answerIndex: 0, explanation: "超幾何分布は「非復元抽出」に対応します。" },
    { id: "q_hyp_02", itemId: "hypergeometric", question: "超幾何分布の期待値はどれですか？（全体N, 当たりM, 抽出n）", options: ["\\( n (M/N) \\)", "\\( M/N \\)", "\\( n (M/N)(1-M/N) \\)", "\\( nM \\)"], answerIndex: 0, explanation: "期待値は二項分布と同様の形 n * (M/N) となります。" },
    { id: "q_hyp_03", itemId: "hypergeometric", question: "超幾何分布の分散に含まれる補正項（有限母集団修正）はどれですか？", options: ["\\( (N-n)/(N-1) \\)", "\\( (N-n)/N \\)", "\\( N/(N-1) \\)", "\\( 1/N \\)"], answerIndex: 0, explanation: "非復元抽出による依存性を反映した (N-n)/(N-1) という項が付きます。" },
    { id: "q_hyp_04", itemId: "hypergeometric", question: "確率関数 P(X=k) の分母に来る組み合わせの数は？", options: ["\\( \\binom{N}{n} \\)", "\\( \\binom{M}{n} \\)", "\\( \\binom{N}{k} \\)", "\\( n^N \\)"], answerIndex: 0, explanation: "全体 N 個から n 個選ぶ組み合わせが全事象となります。" },
    { id: "q_hyp_05", itemId: "hypergeometric", question: "母集団 N が抽出数 n に対して非常に大きいとき、超幾何分布はどの分布に近づきますか？", options: ["二項分布", "ポアソン分布", "正規分布", "一様分布"], answerIndex: 0, explanation: "N が大きいと非復元の影響が小さくなり、復元抽出（二項分布）で近似できます。" },

    // --- 幾何分布 (geometric) ---
    { id: "q_geo_01", itemId: "geometric", question: "幾何分布（初めて成功するまでの試行回数 X）の期待値はどれですか？", options: ["\\( 1/p \\)", "\\( (1-p)/p \\)", "\\( p \\)", "\\( 1/p^2 \\)"], answerIndex: 0, explanation: "試行回数を変数とする場合、期待値は 1/p です。" },
    { id: "q_geo_02", itemId: "geometric", question: "幾何分布の確率母関数 (PGF) はどれですか？", options: ["\\( \\frac{pt}{1-(1-p)t} \\)", "\\( \\frac{p}{1-(1-p)t} \\)", "\\( \\frac{pt}{1-pt} \\)", "\\( (pt+1-p)^n \\)"], answerIndex: 0, explanation: "幾何分布の PGF は \\( pt / (1 - (1-p)t) \\) です。" },
    { id: "q_geo_03", itemId: "geometric", question: "幾何分布の分散はどれですか？", options: ["\\( \\frac{1-p}{p^2} \\)", "\\( \\frac{1}{p^2} \\)", "\\( \\frac{1-p}{p} \\)", "\\( \\frac{p}{1-p} \\)"], answerIndex: 0, explanation: "幾何分布の分散は \\( (1-p)/p^2 \\) です。" },
    { id: "q_geo_04", itemId: "geometric", question: "幾何分布が持つ、過去の試行結果が将来に影響しない性質を何と呼びますか？", options: ["無記憶性", "独立性", "定常性", "回帰性"], answerIndex: 0, explanation: "P(X > s+t | X > s) = P(X > t) が成り立つ性質です。" },
    { id: "q_geo_05", itemId: "geometric", question: "幾何分布の確率関数 P(X=k) はどれですか？", options: ["\\( p(1-p)^{k-1} \\)", "\\( p^k(1-p) \\)", "\\( (1-p)^k \\)", "\\( pk(1-p) \\)"], answerIndex: 0, explanation: "k-1 回失敗した後に 1 回成功する確率です。" },

    // --- 負の二項分布 (neg_binomial) ---
    { id: "q_nbin_01", itemId: "neg_binomial", question: "負の二項分布（r回成功までの試行回数 X）の期待値はどれですか？", options: ["\\( r/p \\)", "\\( r(1-p)/p \\)", "\\( r(1-p)/p^2 \\)", "\\( 1/p \\)"], answerIndex: 0, explanation: "期待値は r/p です。" },
    { id: "q_nbin_02", itemId: "neg_binomial", question: "負の二項分布の確率母関数 (PGF) はどれですか？", options: ["\\( (\\frac{pt}{1-(1-p)t})^r \\)", "\\( (\\frac{p}{1-(1-p)t})^r \\)", "\\( (pt+1-p)^r \\)", "\\( e^{\\lambda(t-1)} \\)"], answerIndex: 0, explanation: "幾何分布の PGF を r 乗した形になります。" },
    { id: "q_nbin_03", itemId: "neg_binomial", question: "負の二項分布において r=1 としたとき、どの分布に一致しますか？", options: ["幾何分布", "二項分布", "ポアソン分布", "指数分布"], answerIndex: 0, explanation: "「1回成功するまで」なので、幾何分布と等しくなります。" },
    { id: "q_nbin_04", itemId: "neg_binomial", question: "独立な r1, r2 個の成功を待つ負の二項分布の和はどうなりますか？", options: ["r1 + r2 の負の二項分布", "r1 * r2 の負の二項分布", "正規分布", "ポアソン分布"], answerIndex: 0, explanation: "再生性があり、成功回数の和の分布に従います。" },
    { id: "q_nbin_05", itemId: "neg_binomial", question: "負の二項分布の分散はどれですか？", options: ["\\( \\frac{r(1-p)}{p^2} \\)", "\\( \\frac{r}{p^2} \\)", "\\( \\frac{r(1-p)}{p} \\)", "\\( r p (1-p) \\)"], answerIndex: 0, explanation: "分散は r(1-p)/p^2 です。" },

    // --- 多項分布 (multinomial) ---
    { id: "q_multi_01", itemId: "multinomial", question: "多項分布の期待値 E[Xi] はどれですか？", options: ["\\( n p_i \\)", "\\( p_i \\)", "\\( n p_i (1-p_i) \\)", "\\( \\sum p_i \\)"], answerIndex: 0, explanation: "各成分については二項分布と同様に np_i となります。" },
    { id: "q_multi_02", itemId: "multinomial", question: "多項分布の確率母関数 (PGF) はどのようになりますか？", options: ["\\( (\\sum p_i t_i)^n \\)", "\\( \\sum p_i t_i^n \\)", "\\( (\\prod p_i t_i)^n \\)", "\\( (p t + 1-p)^n \\)"], answerIndex: 0, explanation: "多変量の PGF は (p1*t1 + p2*t2 + ...)^n です。" },
    { id: "q_multi_03", itemId: "multinomial", question: "多項分布において、異なる成分 Xi と Xj (i ≠ j) の共分散はどうなりますか？", options: ["負の値になる (-np_i p_j)", "正の値になる (np_i p_j)", "0 になる", "分散の和になる"], answerIndex: 0, explanation: "一方が増えれば他方が減る関係にあるため、共分散は負になります。" },
    { id: "q_multi_04", itemId: "multinomial", question: "多項分布のある一つの成分 Xi だけに注目した周辺分布は何になりますか？", options: ["二項分布", "幾何分布", "ポアソン分布", "一様分布"], answerIndex: 0, explanation: "「iかそれ以外か」の2通りになるため、二項分布に従います。" },
    { id: "q_multi_05", itemId: "multinomial", question: "多項分布の確率関数 P(k1, ..., km) の分母にある階乗の積は？", options: ["\\( k_1! k_2! \\dots k_m! \\)", "\\( (k_1 + \\dots + k_m)! \\)", "\\( n! \\)", "\\( p_1! \\dots p_m! \\)"], answerIndex: 0, explanation: "同じものを含む順列の公式に基づきます。" },

    // --- 正規分布 (normal) ---
    { id: "q_norm_01", itemId: "normal", question: "正規分布 N(μ, σ²) の期待値と分散の組み合わせとして正しいものは？", options: ["(μ, σ²)", "(σ², μ)", "(0, 1)", "(μ, σ)"], answerIndex: 0, explanation: "パラメータ μ は平均、σ² は分散を表します。" },
    { id: "q_norm_02", itemId: "normal", question: "正規分布 N(μ, σ²) のモーメント母関数 (MGF) はどれですか？", options: ["\\( \\exp(\\mu t + \\frac{\\sigma^2 t^2}{2}) \\)", "\\( \\exp(\\mu t + \\sigma^2 t) \\)", "\\( \\exp(\\frac{\\sigma^2 t^2}{2}) \\)", "\\( \\mu t + \\frac{\\sigma^2 t^2}{2} \\)"], answerIndex: 0, explanation: "正規分布の MGF は \\( \\exp(\\mu t + \\sigma^2 t^2 / 2) \\) です。" },
    { id: "q_norm_03", itemId: "normal", question: "標準正規分布の密度関数の形状について正しいものはどれですか？", options: ["x=0 に関して対称", "x=μ に関して対称", "常に正の範囲のみ", "指数関数的に増加する"], answerIndex: 0, explanation: "平均0を中心に左右対称（ベル型）です。" },
    { id: "q_norm_04", itemId: "normal", question: "正規分布において、[μ-σ, μ+σ] の範囲にデータが含まれる確率はおよそ何%ですか？", options: ["68%", "95%", "99.7%", "50%"], answerIndex: 0, explanation: "いわゆる 1σ 区間には約 68.27% が含まれます。" },
    { id: "q_norm_05", itemId: "normal", question: "変数 X ~ N(μ, σ²) を標準正規分布 Z ~ N(0, 1) に変換する式は？", options: ["Z = (X - μ) / σ", "Z = (X - μ) / σ²", "Z = X - μ", "Z = σX + μ"], answerIndex: 0, explanation: "平均を引き、標準偏差で割ることで標準化されます。" },

    // --- 指数分布 (exponential) ---
    { id: "q_exp_01", itemId: "exponential", question: "指数分布（パラメータ λ）の期待値はどれですか？", options: ["\\( 1/\\lambda \\)", "\\( \\lambda \\)", "\\( 1/\\lambda^2 \\)", "\\( e^{-\\lambda} \\)"], answerIndex: 0, explanation: "指数分布の期待値は 1/λ です。" },
    { id: "q_exp_02", itemId: "exponential", question: "指数分布の分散はどれですか？", options: ["\\( 1/\\lambda^2 \\)", "\\( 1/\\lambda \\)", "\\( \\lambda^2 \\)", "\\( 2/\\lambda^2 \\)"], answerIndex: 0, explanation: "指数分布の分散は 1/λ² です。" },
    { id: "q_exp_03", itemId: "exponential", question: "指数分布のモーメント母関数 (MGF) はどれですか？", options: ["\\( \\frac{\\lambda}{\\lambda-t} \\)", "\\( \\frac{1}{\\lambda-t} \\)", "\\( \\lambda e^{-\\lambda t} \\)", "\\( (1-t/\\lambda)^{-1} \\)"], answerIndex: 0, explanation: "MGF は λ/(λ-t) です。" },
    { id: "q_exp_04", itemId: "exponential", question: "幾何分布の連続版ともいえる、指数分布が持つ性質は？", options: ["無記憶性", "定常性", "対称性", "有限台"], answerIndex: 0, explanation: "連続分布の中で唯一無記憶性を持ちます。" },
    { id: "q_exp_05", itemId: "exponential", question: "事象の発生間隔が指数分布に従うとき、単位時間あたりの発生回数はどの分布に従いますか？", options: ["ポアソン分布", "二項分布", "正規分布", "一様分布"], answerIndex: 0, explanation: "指数分布とポアソン分布は裏表の関係にあります。" },

    // --- ガンマ分布 (gamma_dist) ---
    { id: "q_gam_01", itemId: "gamma_dist", question: "ガンマ分布 Ga(α, β) において、α=1 としたときどの分布に一致しますか？", options: ["指数分布", "正規分布", "ベータ分布", "カイ二乗分布"], answerIndex: 0, explanation: "パラメータ λ=β の指数分布になります。" },
    { id: "q_gam_02", itemId: "gamma_dist", question: "ガンマ分布 Ga(α, β) の期待値はどれですか？", options: ["\\( \\alpha / \\beta \\)", "\\( \\beta / \\alpha \\)", "\\( \\alpha / \\beta^2 \\)", "\\( \\alpha \\beta \\)"], answerIndex: 0, explanation: "期待値は α/β です。" },
    { id: "q_gam_03", itemId: "gamma_dist", question: "ガンマ分布 Ga(α, β) のモーメント母関数 (MGF) はどれですか？", options: ["\\( (1 - t/\\beta)^{-\\alpha} \\)", "\\( (1 - 2t)^{-\\alpha} \\)", "\\( e^{\\alpha t} \\)", "\\( (1 - \\beta t)^{-\\alpha} \\)"], answerIndex: 0, explanation: "MGF は (1 - t/β)^-α です。" },
    { id: "q_gam_04", itemId: "gamma_dist", question: "独立な n 個の指数分布 Exp(λ) の和はどの分布に従いますか？", options: ["ガンマ分布 Ga(n, λ)", "指数分布 Exp(nλ)", "正規分布", "カイ二乗分布"], answerIndex: 0, explanation: "ガンマ分布は指数分布の和として解釈できます。" },
    { id: "q_gam_05", itemId: "gamma_dist", question: "ガンマ分布の分散はどれですか？", options: ["\\( \\alpha / \\beta^2 \\)", "\\( \\alpha / \\beta \\)", "\\( \\alpha^2 / \\beta \\)", "\\( \\alpha \\beta^2 \\)"], answerIndex: 0, explanation: "分散は α / β² です。" },

    // --- ベータ分布 (beta_dist) ---
    { id: "q_bet_01", itemId: "beta_dist", question: "ベータ分布 Be(α, β) で α=1, β=1 のとき、どの分布に一致しますか？", options: ["一様分布 U(0, 1)", "正規分布", "ガンマ分布", "指数分布"], answerIndex: 0, explanation: "[0, 1] の一様分布になります。" },
    { id: "q_bet_02", itemId: "beta_dist", question: "ベータ分布 Be(α, β) の期待値はどれですか？", options: ["\\( \\alpha / (\\alpha + \\beta) \\)", "\\( \\beta / (\\alpha + \\beta) \\)", "\\( \\alpha \\beta \\)", "\\( 1/(\\alpha + \\beta) \\)"], answerIndex: 0, explanation: "期待値は α / (α + β) です。" },
    { id: "q_bet_03", itemId: "beta_dist", question: "ベータ分布の正規化定数 B(α, β) は何ですか？", options: ["ベータ関数", "ガンマ関数", "誤差関数", "円周率"], answerIndex: 0, explanation: "ベータ関数を用いて定義されます。" },
    { id: "q_bet_04", itemId: "beta_dist", question: "一様分布からの標本を並べ替えた「順序統計量」はどの分布に従いますか？", options: ["ベータ分布", "正規分布", "ガンマ分布", "カイ二乗分布"], answerIndex: 0, explanation: "U(0, 1) からの n 個の標本のうち k 番目に小さい値は Be(k, n-k+1) に従います。" },
    { id: "q_bet_05", itemId: "beta_dist", question: "ベータ分布の分散の分母に含まれる項は？", options: ["\\( (\\alpha + \\beta)^2 (\\alpha + \\beta + 1) \\)", "\\( \\alpha + \\beta \\)", "\\( \\alpha \\beta \\)", "\\( \\alpha + \\beta + 1 \\)"], answerIndex: 0, explanation: "分散は \\( \\alpha\\beta / [(\\alpha+\\beta)^2(\\alpha+\\beta+1)] \\) です。" },

    // --- コーシー分布 (cauchy) ---
    { id: "q_ca_01", itemId: "cauchy", question: "コーシー分布の標本平均の分布はどうなりますか？", options: ["元の分布と同じコーシー分布に従う", "正規分布に近づく", "分散が 1/n になる", "期待値 0 に収束する"], answerIndex: 0, explanation: "分散が無限大のため中心極限定理が効かず、平均をとっても形が変わりません。" },
    { id: "q_ca_02", itemId: "cauchy", question: "コーシー分布のモーメント母関数 (MGF) はなぜ存在しないのですか？", options: ["積分が収束しないため", "関数が負になるため", "微分できないため", "定義されていないため"], answerIndex: 0, explanation: "裾が厚すぎるため、e^tx をかけた積分が発散します。" },
    { id: "q_ca_03", itemId: "cauchy", question: "標準コーシー分布はどの分布と等価ですか？", options: ["自由度1のt分布", "自由度1のカイ二乗分布", "標準正規分布", "自由度2のF分布"], answerIndex: 0, explanation: "t分布で自由度 n=1 のときがコーシー分布です。" },
    { id: "q_ca_04", itemId: "cauchy", question: "コーシー分布の代表値として適切なものはどれですか？", options: ["中央値 (Median)", "算術平均", "期待値", "分散"], answerIndex: 0, explanation: "平均や期待値は定義されませんが、中央値は位置パラメータ x0 となります。" },
    { id: "q_ca_05", itemId: "cauchy", question: "コーシー分布の密度関数の分母の形は？", options: ["\\( 1 + ((x-x_0)/\\gamma)^2 \\)", "\\( \\exp(x^2) \\)", "\\( \\sqrt{x} \\)", "\\( 1 + x \\)"], answerIndex: 0, explanation: "密度関数は 1/(πγ[1+((x-x0)/γ)^2]) です。" },

    // --- 対数正規分布 (lognormal) ---
    { id: "q_ln_01", itemId: "lognormal", question: "対数正規分布の定義域はどれですか？", options: ["x > 0", "全実数", "x >= 1", "0 < x < 1"], answerIndex: 0, explanation: "対数をとるため変数は正である必要があります。" },
    { id: "q_ln_02", itemId: "lognormal", question: "対数正規分布の期待値はどう表されますか？", options: ["\\( e^{\\mu + \\sigma^2/2} \\)", "\\( e^\\mu \\)", "\\( \\mu \\)", "\\( \\ln \\mu \\)"], answerIndex: 0, explanation: "期待値は exp(μ + σ²/2) です。" },
    { id: "q_ln_03", itemId: "lognormal", question: "対数正規分布の最頻値 (Mode) は中央値と比較してどうなりますか？", options: ["中央値より小さい", "中央値より大きい", "中央値と等しい", "比較できない"], answerIndex: 0, explanation: "左に偏った（右に裾が長い）分布のため、Mode < Median < Mean となります。" },
    { id: "q_ln_04", itemId: "lognormal", question: "対数正規分布の累積分布関数は何を用いて表されますか？", options: ["標準正規分布の累積分布関数 Φ", "ガンマ関数", "ベータ関数", "指数関数"], answerIndex: 0, explanation: "ln x を標準化して Φ((ln x - μ)/σ) となります。" },
    { id: "q_ln_05", itemId: "lognormal", question: "対数正規分布の分散の式に含まれるのは？", options: ["\\( e^{\\sigma^2} - 1 \\)", "\\( \\sigma^2 \\)", "\\( e^\\mu \\)", "\\( \\ln \\sigma \\)"], answerIndex: 0, explanation: "分散は exp(2μ+σ²)(exp(σ²)-1) です。" },

    // --- ワイブル分布 (weibull) ---
    { id: "q_wei_01", itemId: "weibull", question: "ワイブル分布の形状パラメータ k=1 のとき、どの分布になりますか？", options: ["指数分布", "正規分布", "レイリー分布", "一様分布"], answerIndex: 0, explanation: "k=1 のとき、故障率が一定の指数分布になります。" },
    { id: "q_wei_02", itemId: "weibull", question: "ワイブル分布の故障率（ハザード関数）が時間とともに増加するのは？", options: ["k > 1", "k = 1", "k < 1", "常に一定"], answerIndex: 0, explanation: "k > 1 のとき、摩耗故障期を表します。" },
    { id: "q_wei_03", itemId: "weibull", question: "ワイブル分布の期待値の式に含まれるのは？", options: ["\\( \\Gamma(1 + 1/k) \\)", "\\( e^k \\)", "\\( 1/k \\)", "\\( \\pi \\)"], answerIndex: 0, explanation: "期待値は λ Γ(1 + 1/k) です。" },
    { id: "q_wei_04", itemId: "weibull", question: "ワイブル分布の信頼性関数 R(t) はどれですか？", options: ["\\( e^{-(t/\\lambda)^k} \\)", "\\( 1 - e^{-t} \\)", "\\( (t/\\lambda)^k \\)", "\\( e^{-t} \\)"], answerIndex: 0, explanation: "累積分布関数を 1 から引いたものです。" },
    { id: "q_wei_05", itemId: "weibull", question: "ワイブル分布が特によく使われる分野は？", options: ["信頼性工学・寿命解析", "金融工学", "心理学", "農学"], answerIndex: 0, explanation: "機械の寿命や材料の強度などの解析に広く使われます。" },

    // --- ロジスティック分布 (logistic) ---
    { id: "q_logi_01", itemId: "logistic", question: "ロジスティック分布の形状の特徴は？", options: ["正規分布に似ているが裾が厚い", "指数分布に似ている", "左右非対称である", "常に一定である"], answerIndex: 0, explanation: "ベル型ですが、正規分布よりも極端な値が出やすいです。" },
    { id: "q_logi_02", itemId: "logistic", question: "ロジスティック分布の期待値は？", options: ["μ", "s", "0", "1/s"], answerIndex: 0, explanation: "位置パラメータ μ が期待値となります。" },
    { id: "q_logi_03", itemId: "logistic", question: "ロジスティック分布の分散はどれですか？", options: ["\\( \\frac{s^2 \\pi^2}{3} \\)", "\\( s^2 \\)", "\\( \\frac{\\sigma^2}{2} \\)", "\\( \\pi^2 \\)"], answerIndex: 0, explanation: "分散は (s² π²) / 3 です。" },
    { id: "q_logi_04", itemId: "logistic", question: "ロジスティック分布の累積分布関数 F(x) はどれですか？", options: ["\\( \\frac{1}{1 + e^{-(x-\\mu)/s}} \\)", "\\( e^{-x} \\)", "\\( \\frac{x}{1+x} \\)", "\\( 1 - e^{-x} \\)"], answerIndex: 0, explanation: "シグモイド関数（ロジスティック関数）の形になります。" },
    { id: "q_logi_05", itemId: "logistic", question: "ロジスティック分布が使われる代表的な手法は？", options: ["ロジスティック回帰", "主成分分析", "分散分析", "t検定"], answerIndex: 0, explanation: "二値分類などのロジスティック回帰モデルの背景にあります。" },

    // --- 多変量正規分布 (multivariate_normal) ---
    { id: "q_mvn_01", itemId: "multivariate_normal", question: "多変量正規分布を規定するパラメータは？", options: ["平均ベクトルと分散共分散行列", "平均ベクトルと標準偏差", "期待値と相関係数", "μ と σ"], answerIndex: 0, explanation: "ベクトル μ と行列 Σ で定義されます。" },
    { id: "q_mvn_02", itemId: "multivariate_normal", question: "2変量正規分布において共分散が0であるとき、2つの変数は？", options: ["独立である", "独立とは限らない", "負の相関がある", "常に正の相関がある"], answerIndex: 0, explanation: "正規分布では「無相関 ⇔ 独立」が成り立ちます。" },
    { id: "q_mvn_03", itemId: "multivariate_normal", question: "多変量正規分布のモーメント母関数 (MGF) の指数部分に含まれるのは？", options: ["\\( \\frac{1}{2} \\mathbf{t}^T \\Sigma \\mathbf{t} \\)", "\\( \\mathbf{t} \\Sigma \\)", "\\( \\Sigma^2 \\)", "\\( |\\Sigma| \\)"], answerIndex: 0, explanation: "正規分布の MGF を多次元に拡張した形になります。" },
    { id: "q_mvn_04", itemId: "multivariate_normal", question: "多変量正規分布の周辺分布はどうなりますか？", options: ["それぞれ正規分布に従う", "カイ二乗分布になる", "一様分布になる", "元の次元に依存する"], answerIndex: 0, explanation: "任意の成分や部分ベクトルもまた正規分布に従います。" },
    { id: "q_mvn_05", itemId: "multivariate_normal", question: "多変量正規分布の密度関数の指数部にある、マハラノビス距離の二乗に対応する項は？", options: ["\\( (\\mathbf{x}-\\boldsymbol{\mu})^T \\Sigma^{-1} (\\mathbf{x}-\\boldsymbol{\mu}) \\)", "\\( (x-\\mu)^2 \\)", "\\( \\mathbf{x}^T \\mathbf{x} \\)", "\\( \\det(\\Sigma) \\)"], answerIndex: 0, explanation: "この項が等高線（楕円）の形状を決定します。" },

    // --- カイ二乗分布 (chi_square) ---
    { id: "q_chi_01", itemId: "chi_square", question: "自由度 n のカイ二乗分布の期待値はどれですか？", options: ["n", "2n", "n/2", "√n"], answerIndex: 0, explanation: "自由度 n と一致します。" },
    { id: "q_chi_02", itemId: "chi_square", question: "自由度 n のカイ二乗分布の分散はどれですか？", options: ["2n", "n", "4n", "n^2"], answerIndex: 0, explanation: "分散は 2n です。" },
    { id: "q_chi_03", itemId: "chi_square", question: "カイ二乗分布のモーメント母関数 (MGF) はどれですか？", options: ["\\( (1-2t)^{-n/2} \\)", "\\( (1-t)^{-n/2} \\)", "\\( e^{nt} \\)", "\\( (1-2t)^n \\)"], answerIndex: 0, explanation: "MGF は (1-2t)^(-n/2) です。" },
    { id: "q_chi_04", itemId: "chi_square", question: "自由度 n のカイ二乗分布は、ガンマ分布のどのパラメータに相当しますか？", options: ["Ga(n/2, 1/2)", "Ga(n, 1)", "Ga(n, 2)", "Ga(1, n)"], answerIndex: 0, explanation: "カイ二乗分布はガンマ分布の特殊なケースです。" },
    { id: "q_chi_05", itemId: "chi_square", question: "カイ二乗分布が使われる主な場面は？", options: ["分散の推定や適合度検定", "平均の検定", "比率の検定", "寿命解析"], answerIndex: 0, explanation: "標本分散の分布やクロス集計表の独立性検定に使われます。" },

    // --- t分布 (t_dist) ---
    { id: "q_t_01", itemId: "t_dist", question: "t分布において自由度 n が無限大に近づくと、どの分布に収束しますか？", options: ["標準正規分布", "カイ二乗分布", "F分布", "指数分布"], answerIndex: 0, explanation: "n → ∞ で N(0, 1) に近づきます。" },
    { id: "q_t_02", itemId: "t_dist", question: "自由度 n > 2 のとき、t分布の分散はどれですか？", options: ["\\( n/(n-2) \\)", "1", "\\( (n-2)/n \\)", "\\( 2n \\)"], answerIndex: 0, explanation: "分散は n/(n-2) です。" },
    { id: "q_t_03", itemId: "t_dist", question: "t分布の期待値（n > 1 の場合）はどれですか？", options: ["0", "1", "n", "定義されない"], answerIndex: 0, explanation: "対称な分布のため期待値は 0 です。" },
    { id: "q_t_04", itemId: "t_dist", question: "t分布の定義に使われる変数の組み合わせは？", options: ["標準正規分布とカイ二乗分布", "2つの正規分布", "2つのカイ二乗分布", "指数分布と正規分布"], answerIndex: 0, explanation: "Z / sqrt(V/n) という形で定義されます。" },
    { id: "q_t_05", itemId: "t_dist", question: "正規分布と比較したt分布の特徴は？", options: ["裾が厚い (Heavy-tailed)", "裾が細い", "非対称である", "常に正である"], answerIndex: 0, explanation: "サンプルサイズが小さいときの不確実性を反映して裾が厚くなります。" },

    // --- F分布 (f_dist) ---
    { id: "q_f_01", itemId: "f_dist", question: "F分布はどのような統計量の比として定義されますか？", options: ["独立な2つのカイ二乗分布をそれぞれの自由度で割った比", "2つの正規分布の比", "正規分布とカイ二乗分布の比", "2つのt分布の比"], answerIndex: 0, explanation: "F = (U/n1) / (V/n2) です。" },
    { id: "q_f_02", itemId: "f_dist", question: "F分布 F(n1, n2) において、n2 > 2 のときの期待値は？", options: ["\\( n_2 / (n_2 - 2) \\)", "\\( n_1 / (n_1 - 2) \\)", "1", "\\( n_2 / n_1 \\)"], answerIndex: 0, explanation: "期待値は n2 / (n2 - 2) です。" },
    { id: "q_f_03", itemId: "f_dist", question: "F(n1, n2) に従う変数 X の逆数 1/X はどの分布に従いますか？", options: ["F(n2, n1)", "F(n1, n2)", "カイ二乗分布", "t分布"], answerIndex: 0, explanation: "自由度が入れ替わります。" },
    { id: "q_f_04", itemId: "f_dist", question: "自由度 n の t分布に従う変数の2乗は、どの分布に従いますか？", options: ["F(1, n)", "F(n, 1)", "カイ二乗分布 χ²(n)", "正規分布"], answerIndex: 0, explanation: "t² は分子自由度1のF分布になります。" },
    { id: "q_f_05", itemId: "f_dist", question: "F分布が主に使われる検定は？", options: ["分散分析 (ANOVA)", "t検定", "適合度検定", "符号検定"], answerIndex: 0, explanation: "3群以上の平均の差を比較する際などに分散の比を用います。" },

    // --- 大数の弱法則 (weak_law) ---
    { id: "q_wl_01", itemId: "weak_law", question: "大数の弱法則において標本平均は母平均にどのように近づきますか？", options: ["確率収束する", "法則収束する", "平均収束する", "一様収束する"], answerIndex: 0, explanation: "弱法則は確率収束を述べています。" },
    { id: "q_wl_02", itemId: "weak_law", question: "大数の法則が成立するための最も一般的な条件は？", options: ["期待値が存在する", "分散が無限大", "サンプルが少ない", "正規分布である"], answerIndex: 0, explanation: "期待値が存在すれば法則は成り立ちます。" },
    { id: "q_wl_03", itemId: "weak_law", question: "大数の法則を証明する際に使われる不等式は？", options: ["チェビシェフの不等式", "コーシーの不等式", "イェンセンの不等式", "三角不等式"], answerIndex: 0, explanation: "分散が存在する場合、チェビシェフの不等式で示せます。" },

    // --- 中心極限定理 (clt) ---
    { id: "q_clt_01", itemId: "clt", question: "中心極限定理で標本平均の分布が近づく分布は？", options: ["正規分布", "t分布", "カイ二乗分布", "ポアソン分布"], answerIndex: 0, explanation: "和や平均の分布は正規分布に近づきます。" },
    { id: "q_clt_02", itemId: "clt", question: "中心極限定理が述べている収束の種類は？", options: ["法則収束（分布収束）", "確率収束", "平均収束", "絶対収束"], answerIndex: 0, explanation: "分布の形が近づく「法則収束」です。" },
    { id: "q_clt_03", itemId: "clt", question: "標本平均 X_bar の分散は n が大きくなるとどうなりますか？", options: ["σ²/n になり、0に近づく", "σ² になり、一定", "nσ² になり、発散する", "1 になる"], answerIndex: 0, explanation: "分散が小さくなるため、平均値の推定精度が上がります。" },

    // --- 変数変換 (variable_transformation) ---
    { id: "q_tra_01", itemId: "variable_transformation", question: "密度関数の変換式に含まれる導関数の絶対値 |dx/dy| を何と呼びますか？", options: ["ヤコビアン", "ヘッシアン", "勾配", "ラプラシアン"], answerIndex: 0, explanation: "多次元ではヤコビ行列の行列式になります。" },
    { id: "q_tra_02", itemId: "variable_transformation", question: "変数変換 Y = g(X) で g が減少関数の場合、ヤコビアンはどうなりますか？", options: ["負の値を絶対値で正にする", "常に正なのでそのまま", "0になる", "定義されない"], answerIndex: 0, explanation: "確率は常に正である必要があるため、絶対値をとります。" },
    { id: "q_tra_03", itemId: "variable_transformation", question: "X ~ N(0, 1) のとき Y = X² はどの分布に従いますか？", options: ["カイ二乗分布 χ²(1)", "正規分布", "指数分布", "F分布"], answerIndex: 0, explanation: "標準正規分布の2乗は自由度1のカイ二乗分布です。" },

    // --- ガンマ関数 (gamma_function) ---
    { id: "q_gaf_01", itemId: "gamma_function", question: "ガンマ関数 Γ(n) で n が正の整数のとき？", options: ["(n-1)!", "n!", "(n+1)!", "2^n"], answerIndex: 0, explanation: "Γ(n) = (n-1)! です。" },
    { id: "q_gaf_02", itemId: "gamma_function", question: "Γ(1/2) の値は？", options: ["√π", "π", "1/2", "1"], answerIndex: 0, explanation: "Γ(1/2) = √π です。" },
    { id: "q_gaf_03", itemId: "gamma_function", question: "Γ(z+1) を Γ(z) で表すと？", options: ["z Γ(z)", "Γ(z)", "z! Γ(z)", "Γ(z)/z"], answerIndex: 0, explanation: "漸化式 Γ(z+1) = zΓ(z) です。" },

    // --- ベータ関数 (beta_function) ---
    { id: "q_bef_01", itemId: "beta_function", question: "ベータ関数 B(x, y) の対称性は？", options: ["B(x, y) = B(y, x)", "B(x, y) = -B(y, x)", "対称性はない", "x > y のみ定義"], answerIndex: 0, explanation: "x と y を入れ替えても値は同じです。" },
    { id: "q_bef_02", itemId: "beta_function", question: "B(1, 1) の値は？", options: ["1", "0", "1/2", "π"], answerIndex: 0, explanation: "∫[0,1] 1 dt = 1 です。" },
    { id: "q_bef_03", itemId: "beta_function", question: "ベータ関数をガンマ関数で表すと？", options: ["Γ(x)Γ(y) / Γ(x+y)", "Γ(x+y) / Γ(x)Γ(y)", "Γ(x)Γ(y)", "Γ(xy)"], answerIndex: 0, explanation: "B(x, y) = Γ(x)Γ(y) / Γ(x+y) です。" },

    // --- ベータ関数とガンマ関数の関係 (beta_gamma_relation) ---
    { id: "q_bgr_01", itemId: "beta_gamma_relation", question: "B(x, y) をガンマ関数で表す公式はどれですか？", options: ["\\( \\frac{\\Gamma(x)\\Gamma(y)}{\\Gamma(x+y)} \\)", "\\( \\frac{\\Gamma(x+y)}{\\Gamma(x)\\Gamma(y)} \\)", "\\( \\Gamma(x)\\Gamma(y) \\)", "\\( \\frac{\\Gamma(x)\\Gamma(y)}{\\Gamma(x+y-1)} \\)"], answerIndex: 0, explanation: "ベータ関数とガンマ関数の関係式は \\( B(x, y) = \\frac{\\Gamma(x)\\Gamma(y)}{\\Gamma(x+y)} \\) です。" },
    { id: "q_bgr_02", itemId: "beta_gamma_relation", question: "B(3, 2) をガンマ関数で計算する場合、分子はどうなりますか？", options: ["2! * 1!", "3! * 2!", "Γ(5)", "B(2, 3)"], answerIndex: 0, explanation: "B(3, 2) = Γ(3)Γ(2)/Γ(5) なので、分子は Γ(3)Γ(2) = 2! * 1! です。" },
    { id: "q_bgr_03", itemId: "beta_gamma_relation", question: "ベータ関数 Be(α, β) の正規化定数としてこの関係が使われる分布は？", options: ["ベータ分布", "ガンマ分布", "正規分布", "二項分布"], answerIndex: 0, explanation: "ベータ分布の密度関数の分母にある B(α, β) を計算する際に非常に重要です。" },

    // --- 標準誤差 (standard_error) ---
    { id: "q_se_01", itemId: "standard_error", question: "標準誤差 (SE) の意味は？", options: ["推定量の標準偏差", "個々のデータのバラツキ", "測定のミス", "最大誤差"], answerIndex: 0, explanation: "統計量（平均など）がどの程度バラつくかを示します。" },
    { id: "q_se_02", itemId: "standard_error", question: "サンプルサイズ n を4倍にすると標準誤差は？", options: ["1/2倍になる", "1/4倍になる", "2倍になる", "変わらない"], answerIndex: 0, explanation: "分母が √n なので √4=2 で割ります。" },
    { id: "q_se_03", itemId: "standard_error", question: "母分散が未知のとき、標準誤差の推定に使うのは？", options: ["不偏標準偏差 s", "範囲 R", "母分散", "0"], answerIndex: 0, explanation: "s / √n を推定値として使います。" }
];

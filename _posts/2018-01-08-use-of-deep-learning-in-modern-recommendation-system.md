---
title: "Use of Deep Learning in Modern Recommendation System: A Summary of Recent Works"
date: 2018-01-08
category: [论文快读]
tags: [ml,paper,recommendation]
---

## 简介

这是一篇总结性质的论文，其列出了自2013年以来发表的所有将深度学习应用到推荐系统上的论文，对于学习推荐系统算法，尤其是深度学习推荐系统算法是很合适的。

众所周知，推荐系统主要分为三大类：

* 协同过滤（Collaborative filtering）
* 内容推荐（Content based）
* 混合模型（Hybrid recommendation models）

这篇论文收集了33篇论文，其中有7篇是内容推荐相关的、18篇是协同过滤相关的以及8篇混合模型相关的。

以下内容我将按照论文的顺序依次将各个领域里的新方法、新思路捋一捋，其中列出的每一篇论文我都会有单独的文章详细记录。

## 内容推荐

* A. van den Oord, S. Dieleman, and B. Schrauwen, “Deep content-based music recommendation,” Electron. Inf. Syst. Dep., p. 9, 2013.
  这一篇论文利用CNN模型为歌曲生成语义向量，其与传统的线性回归、基于BOW的MLP模型（音乐上BOW？这开玩笑呐）在数百万首歌曲上进行了对比，效果当然是更好了。
*  X. Wang and Y. Wang, “Improving Content-based and Hybrid Music Recommendation using Deep Learning,” MM, pp. 627–636, 2014.
  这一篇基于深度信念网络（DBN）和概率图模型来同时学习音频内容特征以及个性化推荐。其与纯基于内容推荐或者协同过滤的模型进行了对比都有提升。
*  J. Tan, X. Wan, and J. Xiao, “A Neural Network Approach to Quote Recommendation in Writings,” Proc. 25th ACM Int. Conf. Inf. Knowl. Manag. - CIKM ’16, pp. 65–74, 2016.
  H. Lee, Y. Ahn, H. Lee, S. Ha, and S. Lee, “Quote Recommendation in Dialogue using Deep Neural Network,” in Proceedings of the 39th International ACM SIGIR conference on Research and Development in Information Retrieval - SIGIR ’16, 2016, pp. 957–960.
  这两篇论文都是针对文章和对话的语义向量计算上的一些改进。这两篇分别应用了LSTM和CNN等方法、引入Wiki引用等来源来计算向量。
* T. Bansal, D. Belanger, and A. McCallum, “Ask the GRU,” in Proceedings of the 10th ACM Conference on Recommender Systems - RecSys ’16, 2016, pp. 107– 114.
  这一篇是基于GRU计算文本的语义向量，主要是目标是提升在冷启动情况下的协同过滤上的效果。据说测试效果非常的好。看起来这一篇的现实意义比较大一些。
* L. Zheng, V. Noroozi, and P. S. Yu, “Joint Deep Modeling of Users and Items Using Reviews for Recommendation,” 2017.
  这一篇文章提出了一种新的网络叫`Deep Cooperative Networks`，其通过评论信息同时学习了物品的属性以及用户的行为。这个模型使用了一个共享层来连接物品的特点以及用户的行为。论文中其分别与5个方法进行了对比：矩阵分解、概率矩阵分解、LDA、协同主题回归（Collaborative Topic Regression）、隐变量主题（Hidden Factor as Topic），使用了3个真实世界的数据集：`Yelp Reviews` `Amazon Reviews`以及`Beer Reviews`。论文中认为其模型效果在所有数据集上超过了所有方法。
 这个方法蛮有趣的，值得深入看一下。主要是需要理解一下这个`共享层`所带来的提升的原因是什么。我在自己的一个多目标模型的项目中，发现具有共享层的模型要比没有共享层的模型在验证集上的平均效果要好，但是原理上并不是非常解释的通。（引入多目标同时防止了过拟合是OK的，但是并不是很Solid）
* X. Wang et al., “Dynamic Attention Deep Model for Article Recommendation by Learning Human Editors’ Demonstration,” in Proceedings of the 23rd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining - KDD ’17, 2017, pp. 2051– 2059.
  这篇文章很有趣，从简介看来这篇论文解决的问题并不是直接面向终端用户而是编辑们的。其面临的问题是编辑们需要从一个动态更新的新闻池中筛选新闻，但是编辑们并没有一个严格统一的选择标准，因此这个算法通过一个`Dynamic Attention`方法来处理文章生成更加复杂的特征然后再基于这些特征去区分某个编辑是否喜欢。

## 协同过滤

协同过滤具有非常悠久的历史，以下列出的不少方法都尝试用深度学习去替代矩阵分解。

* H. Wang, N. Wang, and D.-Y. Yeung, “Collaborative Deep Learning for Recommender Systems,” in Proceedings of the 21th ACM SIGKDD International Conference on Knowledge Discovery and Data Mining, 2015, pp. 1235–1244.
  这篇论文基于一个`Generalized Bayesian Stacked Denoising Autoencoders`（这个模型不知道怎么翻中文好，就算了）尝试去解决协同过滤中数据稀疏的问题。其表明这个方法在其测试的数据集上表现超过了矩阵分解和`Collaborative Topic Regression`等方法。
* S. Li, J. Kawale, and Y. Fu, “Deep Collaborative Filtering via Marginalized Denoising Auto-encoder,” in Proceedings of the 24th ACM International on Conference on Information and Knowledge Management - CIKM ’15, 2015, pp. 811–820.
  这一篇论文第一个提出了一个合并了深度学习特征到一些经典协同过滤模型（比如矩阵分解）的框架。该论文展示了其新的模型与多个基于矩阵分解的协同过滤模型的对比效果。
* H. Liang and T. Baldwin, “A Probabilistic Rating Auto- encoder for Personalized Recommender Systems,” in Proceedings of the 24th ACM International on Conference on Information and Knowledge Management - CIKM ’15, 2015, pp. 1863–1866.
  这篇论文提出了一种概率评分自动编码器（Probabilistic Rating Auto-Encoder）在用户对物品的评分数据中进行无监督学习并且生成用户画像，用以提升协同过滤的效果。
* R. Devooght and H. Bersini, “Collaborative Filtering with Recurrent Neural Networks,” Aug. 2016.
  这篇论文提出了一种新的思路，他认为协同过滤可以看作为一种序列预测问题，因此可以应用RNN方面的技术进展。论文中使用LSTM与KNN、矩阵分解的方法进行了对比，从结果中看新的方法要优于传统的协同过滤方法。

接下来介绍一些基于Session的推荐上的一些论文以及进展，不少文章都提到了利用RNN相关的技术来优化基于Session的推荐方法。

* A. K. Balazs Hidasi, “Session-based Recommendation with Recurrent Neural Networks,” ICLR, pp. 1–10, 2016.
  这一篇论文首先尝试了在短Session上基于RNN的方式进行推荐，证明了矩阵分解的方法并不适用于基于Session的推荐场景。其在"E-Commerce Clickstream data"和"YouTube-Like OTT View Server Dataset"上的实验显示，RNN要比矩阵分解有显著的提升。
* B. Hidasi, M. Quadrana, A. Karatzoglou, and D. Tikk, “Parallel Recurrent Neural Network Architectures for Feature-rich Session-based Recommendations,” in Proceedings of the 10th ACM Conference on Recommender Systems - RecSys ’16, 2016, pp. 241–21248.
  这一篇文论通过利用物品特征，比如图像或者文本的信息，来增强基于RNN的Session推荐效果。其提出了一种`Parallel RNN`的方式对物品不同的角度进行建模。
* D. Jannach and M. Ludewig, “When Recurrent Neural Networks meet the Neighborhood for Session-Based Recommendation,” in Proceedings of the Eleventh ACM Conference on Recommender Systems - RecSys ’17, 2017, pp. 306–310.
  这一篇论文提出一种混合了RNN与KNN的方法，其效果要好于单独应用两种方法的效果。
* S. P. Chatzis, P. Christodoulou, and A. S. Andreou, “Recurrent Latent Variable Networks for Session-Based Recommendation,” in Proceedings of the 2nd Workshopon Deep Learning for Recommender Systems - DLRS 2017, 2017, pp. 38–45.
  这一篇论文提出一种利用了变分推理（Variational Inference Model）的方法来提高基于Session的RNN模型的效果的。
* V. Bogina and T. Kuflik, “Incorporating dwell time in session-based recommendations with recurrent Neural networks,” in CEUR Workshop Proceedings, 2017, vol. 1922, pp. 57–59.
  这一篇论文提出了一种基于Session的RNN模型，其目标是优化`dwell time`（这个词没有理解特别清楚，原文的解释是：`the time that user spent examining a specific item`）来提高推荐的精准度。

以下是自由发挥的论文们

* S. Deng, L. Huang, G. Xu, X. Wu, and Z. Wu, “On Deep Learning for Trust-Aware Recommendations in Social Networks,” IEEE Trans. Neural Networks Learn. Syst., vol. 28, no. 5, pp. 1164–1177, 2017.
  这一篇论文提出了一种方法得到一个充分考虑了用户的社交信任关系的用户和物品的特征向量，最终将来自社区的和来自用户信任的关系的内容分开。（？？？我这个翻译对吗？我觉得这一段我的理解是错的。读完这篇paper我再回来改。）
* D. Ding, M. Zhang, S.-Y. Li, J. Tang, X. Chen, and Z.-H. Zhou, “BayDNN: Friend Recommendation with Bayesian Personalized Ranking Deep Neural Network,” in Conference on Information and Knowledge Management (CIKM), 2017, pp. 1479–1488.
  这一篇论文提出了一种`Bayesian Personalized Ranking Deep Neural Network`模型来进行好友关系推荐，它使用了CNN作为第一步来抽取语义信息。
* B. Bai, Y. Fan, W. Tan, and J. Zhang, “DLTSR: A Deep Learning Framework for Recommendation of Long-tail Web Services,” IEEE Trans. Serv. Comput., pp. 1–1, 2017.
  这一篇论文提出了一种解决长尾推荐的深度学习框架。它使用了堆叠的自动降噪编码器（denoising auto encoders）用于长尾信息的特征抽取。
* H.-J. Xue, X.-Y. Dai, J. Zhang, S. Huang, and J. Chen, “Deep Matrix Factorization Models for Recommender Systems *,” 2017.
  这一篇论文提出了一种基于深度学习的矩阵分解方法将用户和物品映射到一个低维的空间中。该模型同时使用了明确的评分以及隐含的评分信息。相比较于目前最新的矩阵分解模型其得到了7.5%的提升。
* T. Ebesu and Y. Fang, “Neural Semantic Personalized Ranking for item cold-start recommendation,” Inf. Retr. J., vol. 20, no. 2, pp. 109–131, 2017.
  这一篇论文提出了一种基于深度学习和`PairWise`学习的语义个性化排序模型来解决协同过滤算法中的冷启动问题。
* S. Cao, N. Yang, and Z. Liu, “Online news recommender based on stacked auto-encoder,” in Proceedings - 16th IEEE/ACIS International Conference on Computer and Information Science, ICIS 2017, 2017, pp. 721–726.
  这一篇论文提出了一种堆叠的自动降噪编码器来从原始的用户物品稀疏矩阵中抽取低维特征。
* X. He, L. Liao, H. Zhang, L. Nie, X. Hu, and T.-S. Chua, “Neural Collaborative Filtering,” in Proceedings of the 26th International Conference on World Wide Web - WWW ’17, 2017, pp. 173–182.
  这一篇论文提出了一个通用的深度学习框架来直接学习用户-物品交互信息。这个框架完全的替代了矩阵分解（或者说矩阵分解是它的一个特例）。
* H. Soh, S. Sanner, M. White, and G. Jamieson, “Deep Sequential Recommendation for Personalized Adaptive User Interfaces,” in Proceedings of the 22nd International Conference on Intelligent User Interfaces - IUI ’17, 2017, pp. 589–593.
  这一篇论文提出了一种基于GRU的深度学习模型来学习用户交互模式用以提高个性化推荐的效果。
* R. Van Den Berg, T. N. Kipf, and M. Welling, “Graph Convolutional Matrix Completion,” arXiv, 2017.
  这一篇论文提出了一种基于图的卷积矩阵分解方法，其使用了一种图的自动编码器框架来进行矩阵分解。该模型不仅可以使用用户-物品交互信息还可以加入用户和物品的信息。

##  混合模型

这一部分介绍深度学习在混合推荐模型上的一些进展

* Z. Xu, C. Chen, T. Lukasiewicz, Y. Miao, and X. Meng, “Tag-Aware Personalized Recommendation Using a Deep-Semantic Similarity Model with Negative Sampling,” in Proceedings of the 25th ACM International on Conference on Information and Knowledge Management - CIKM ’16, 2016, pp. 1921– 1924.
   这一篇论文提出了两个基于深度学习模型用于提高基于tag的个性推荐效果。该方法同时优化了基于tag的用户、物品低维向量映射过程。其与传统的`cosine相似度`等方法具有显著的优势。
* D. Kim, C. Park, J. Oh, S. Lee, and H. Yu, “Convolutional Matrix Factorization for Document Context-Aware Recommendation,” in Proceedings of the 10th ACM Conference on Recommender Systems - RecSys ’16, 2016, pp. 233–240.
  这一篇论文提出了一种基于CNN的模型来处理用户和物品的元数据以提高矩阵分解的效果。
* Y. Wu, C. DuBois, A. X. Zheng, and M. Ester, “Collaborative Denoising Auto-Encoders for Top-N Recommender Systems,” in Proceedings of the Ninth ACM International Conference on Web Search and Data Mining - WSDM ’16, 2016, pp. 153–162.
  这一篇论文提出了一种基于自动降噪编码器的协同过滤方法，这个方向相比于其他协同过滤方法具有更好的可扩展性和泛化能力并且更加易于调优。
* Z. Xu, C. Chen, T. Lukasiewicz, and Y. Miao, “Hybrid Deep-Semantic Matrix Factorization for Tag-Aware Personalized Recommendation,” Aug. 2017.
  这一篇论文提出了一种深度语义矩阵分解方法以提高基于tag的推荐效果。其结合了深度语义模型、Hybrid Learning（混合学习？）以及矩阵分解来提高效果。实验显示其显著的提高了推荐的效果。
*  V. Kumar, D. Khattar, S. Gupta, and M. Gupta, “Deep Neural Architecture for News Recommendation,” in Working Notes of the 8th International Conference of the CLEF Initiative, Dublin, Ireland. CEUR Workshop Proceedings, 2017.
  这一篇论文提出了一种基于注意力（Attention）的模型来解决对终端用户推荐的问题，其旨在解决用户对于新闻类咨询的兴趣随着时间变化的问题。
* G. Sottocornola, F. Stella, M. Zanker, and F. Canonaco, “Towards a deep learning model for hybrid recommendation,” in Proceedings of the International Conference on Web Intelligence - WI ’17, 2017, pp. 1260–1264.
  这一篇论文提出了一个基于深度学习的混合推荐系统，其使用`doc2vec`模型来表示用户和物品的画像并建立了一个分类器模型来预测物品与用户之间的相关度，最后使用了一个KNN的方法来预测用户对物品的评分。
* X. Dong, L. Yu, Z. Wu, Y. Sun, L. Yuan, and F. Zhang, “A Hybrid Collaborative Filtering Model with Deep Structure for Recommender Systems,” Aaai, pp. 1309– 1315, 2017.
  这一篇论文提出了一个堆叠的自动降噪编码器深度模型来优化用户和物品的信息以解决用户-物品评分数据的稀疏问题。
* D. Kim, C. Park, J. Oh, and H. Yu, “Deep hybrid recommender systems via exploiting document context and statistics of items,” Inf. Sci. (Ny)., vol. 417, pp. 72– 87, 2017.
  这一篇论文提出了一种基于上下文的CNN混合模型以提高基于概率的矩阵分解的效果。这个方法捕捉了上下文信息并且考虑高斯噪声相关的问题。

## 总结

接下来我将会对以上每一篇论文写一篇“论文快读”系列文章，敬请期待！

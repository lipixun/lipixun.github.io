---
title: "Weight Normalization: A Simple Reparameterization to Accelerate Training of Deep Neural Networks"
date: 2018-07-08
category: [论文快读]
tags: [paper,ml]
math: true
---

[原文请狂击这里](https://papers.nips.cc/paper/6114-weight-normalization-a-simple-reparameterization-to-accelerate-training-of-deep-neural-networks.pdf)

## 概述

本文提出了一种简单实现却能力强大的reparameterization方法，目的是加快深度网络的收敛速度。

## 方法

该方法的基本原理是将权重的方向和大小解耦变成两个变量分别优化，这样做从概念上去理解是可以在两个维度上分别去收敛，加快收敛的速度原理显而易见。

该方法的实现方式也非常的简单，对于一个$y = active(x * w + b)$这样的一个简单层，基本款weight normalization的实现方式是：

$$w = \frac {g} {|v|} * v$$

以上方法非常容易的看到原来的权重$w$变成了两个变量$v$和$g$，其中$v$代表了方向，$g$代表的大小。最终的$\|w\| = g$。论文中还提出了一种对$g$的优化，使得$g = e^s$，优化$s$替代直接优化$g$使得$g$可以有更大、更快的变换空间（scale）。不过文章中表示这种优化方法最后在实验上并没有明显的优势，并且还增加的计算成本。原理上看如果$\|w\|$是一个比较小的数字这种优化方式确实没有很大的提升空间，而对于深度的网络来说，可能很多时候这个值都不会很大（除了输出层，这个每个应用差别很大，所以如果输出的值取值范围非常大，倒是可以考虑使用一下这个优化方法）

求导就不写了，这个比较容易了。

## 问题

* 原文中并没有写$g$在初始化的时候如何设置，毕竟这个值如果到0基本上就是一个死神经元了。我自己在试验的时候使用$1$作为初始化的值。同时基于对0的思考，可以考虑再处理一把$g$，使得这个值只能无限趋近与0但是不可为0，或者给定一个下界。
* 扩展：reparameterization有很多种，还有比如batch normalization，这个后面可以再写几篇文章分别介绍一下。

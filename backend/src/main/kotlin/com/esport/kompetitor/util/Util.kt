package com.esport.kompetitor.util

fun <T> MutableSet<T>.cartesianProductWithSelf(): Set<Pair<T, T>> = this.withIndex().flatMap { (i1, e1) ->
    this.withIndex().filter { (i2, _) ->
        i1 < i2
    }.map { (_, e2) ->
        Pair(e1, e2)
    }
}.toSet()

fun ceilDivide(a: Int, b: Int) =
    (a / b) + if (a % b == 0) 0 else 1
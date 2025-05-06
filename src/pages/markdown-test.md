---
layout: "@/layouts/MarkdownLayout.astro"
---

<p style="display:none">m01nm01n\{th1s_i5_4_T4st_PagE}</p>


# H1
## H2
### H3
#### H4
##### H5
###### H6
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
[link](https://example.com)
**bold**
*italic*
~~strikethrough~~
`inline code`

https://expressive-code.com/key-features/syntax-highlighting/


```diff lang="bash" showLineNumbers
+echo "m01nm10n"
-echo "hello"
```

```kt {2} ins={"fake flag!!!":5-8} title="Title"  startLineNumber=5 wrap
fun main() {
    println("m01nm01n")
}


fun flag(){
    println("fake{th1s_is_4_fake_flag}")
}
```

| TH | TH | TH |
|:-  |:-: | -: |
| TD | TD | TD |
| TD | TD | TD |
| TD | TD | TD |

:::note
warn
:::

:::note_info
info
:::

:::note_alert
alert
:::

:::note_success
success alert
# ああああ
```sh
hello
```
:::

- [ ] todo
- [x] done


  $\mathrm{inline} \ \KaTeX \ e^{i \pi} + 1 = 0 $

```math
\mathrm{block}  \ \KaTeX \\
\int_0^\infty \frac{1}{x^2} \, dx
```
# 「`:`」テスト
localhost:8080 ← `localhost:8080`と表示されるか

---


# 画像の拡張記法
```md
![m01nm01n "width=50%;margin=auto"](../assets/m01nm01n-logo.png)
```
`<alt> "style1=value1;style2=value2"`のようにすると画像にスタイルを付与できる。
`:`(コロン)ではなく`=`なので注意



![m01nm01n "width=50%;margin=auto"](../assets/m01nm01n-logo.png)




- Kotlin
  - Java
  - Scala
    - JavaScript
- Go
- Python
- Rust

1. capture
2. the
3. flag

> aaaa
> quote
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
> ```python
> print("hello")
> ```

# Footnote
Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].

[^1]: My reference.
[^2]: To add line breaks within a footnote, prefix new lines with 2 spaces.
  This is a second line.

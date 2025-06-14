---
title: DIVER OSINT CTF 2025
startDate: 2025-06-07 12:00
endDate: 2025-06-08 12:00
result: 5th
tags:
    - writeup
members:
    - chizuchizu
    - naotiki
    - nxvzbgbfben
    - nimono
pubDate: 2025-06-14
ctfTimeUrl: https://ctftime.org/event/2751/
---
# Diver OSINT CTF 2025 Writeup by m01nm01n

Our team, m01nm01n got 5th place among 668 teams in Diver OSINT CTF 2025.

m01nm01n is a CTF team of National Institute of Technology, Kisarazu College.

![moinmoin](https://hackmd.io/_uploads/H13Z_3mmlg.png)



![image](https://hackmd.io/_uploads/Syu0mKMmeg.png)

## introduction

### bx
「カトリック上野教会」と書いてある
![image](https://hackmd.io/_uploads/r1VMwFzQee.png)
![image](https://hackmd.io/_uploads/rkDdDYMmlg.png)

### document
ファイルを見つけexifを見た.個人名は隠す.

{%preview https://cnrj.cnic.navy.mil/Installations/CFA-Yokosuka/About/Installation-Guide/Airport-Shuttles/ %}

```text=
[~/dl] >>>exiftool 2023\ 08\ 29\ CFAY\ Airport\ Bus\ Schedule.pdf 
ExifTool Version Number         : 12.40
File Name                       : 2023 08 29 CFAY Airport Bus Schedule.pdf
Directory                       : .
File Size                       : 1237 KiB
File Modification Date/Time     : 2025:06:07 12:11:13+09:00
File Access Date/Time           : 2025:06:07 12:11:26+09:00
File Inode Change Date/Time     : 2025:06:07 12:11:21+09:00
File Permissions                : -rw-rw-r--
File Type                       : PDF
File Type Extension             : pdf
MIME Type                       : application/pdf
PDF Version                     : 1.7
Linearized                      : Yes
Author                          : HERE IS THE INFORMATION
Create Date                     : 2023:08:29 14:56:35+09:00
Modify Date                     : 2023:09:25 14:34:09+09:00
XMP Toolkit                     : Adobe XMP Core 9.1-c001 79.2a0d8d9, 2023/03/14-11:19:46
Format                          : application/pdf
Creator                         : Mitchell.Donovan
Title                           : C:\Users\MITCHE~1.DON\AppData\Local\Temp\1\mso4A4A.tmp
Metadata Date                   : 2023:09:25 14:34:09+09:00
Producer                        : Microsoft: Print To PDF
Document ID                     : uuid:6b457268-41a2-4673-8ffe-cf81bf29f12f
Instance ID                     : uuid:0d5fd1e0-b33f-4676-9428-f8aea7d533f6
Page Count                      : 1
```

### finding_my_way
以下でway番号を調べた.
{%preview https://overpass-turbo.eu/ %}

![Screenshot_20250609_100058](https://hackmd.io/_uploads/HJSUzhm7ex.png)

```haskell=
[out:json][timeout:25];
(
  way(around:10,34.735639,138.994950);
);
out body;
>;
out skel qt;
```

### flight_from (1st solve)

このヘリコプターが出発した飛行場のICAOコード（4レターコード）で答えよ。
Flag形式: Diver25{RJTT}
![image](https://hackmd.io/_uploads/SkCKoYMmgx.png)


立川付近で飛び立ってる。

{%preview https://ja.wikipedia.org/wiki/%E7%AB%8B%E5%B7%9D%E9%A3%9B%E8%A1%8C%E5%A0%B4 %}


`Diver25{RJTC}`

### hidden_service
![hidden_service (小)](https://hackmd.io/_uploads/HkERPYzQll.jpg)
頑張って写す

`http://diverahbwzfukwflslim73j7qtthfkesqvfh42obqk4cxrxwtajk7myd[.]onion/`

![image](https://hackmd.io/_uploads/Hkkb_FMQex.png)

`Diver25{w3lc0m3_70_d4rkw3b!}`
### louvre
ルーブル美術館の公共Wi-FiのAP名を調べる
https://contact.louvre.fr/hc/en-gb/articles/12853523479453-Do-you-offer-WiFi
`Louvre_Wifi_Gratuit`らしい
https://wigle.net で調べると見つかる
![image](https://hackmd.io/_uploads/HJx-_zEQle.png)

※Last Timeが問題の条件に合致していないが私は早とちりして、これだと思ってしまった。

調べるとBSSID=Macアドレスだそうなので、ベンダーがわかりそう
https://uic.jp/mac/address/bc9fe4/
![image](https://hackmd.io/_uploads/Hkp__zE7ex.png)

HPEらしいので正式名称で入れる。

`Diver25{Hewlett Packard Enterprise Co.}`

### night_accident (1st solve)

{%preview https://www.youtube.com/watch?v=jHgqCpJNL28 %}

2台の`SBS Transit`のバスが見える。52番と58番だった。バスはシンガポールにあるらしい。
52番と58番の路線図のオーバーラップを調べれば良さそう。
52番
![image](https://hackmd.io/_uploads/S1jI3FMXgg.png)

58番
![image](https://hackmd.io/_uploads/r1mr3YGXel.png)

重なる場所はここだけ。
![image](https://hackmd.io/_uploads/rJLhntfQeg.png)

ストリートビューで付近をみるとここっぽい。

![image](https://hackmd.io/_uploads/S1tgTYGQxx.png)
![image](https://hackmd.io/_uploads/HJk8TKGmlx.png)


### p2t

### ship

![ship](https://hackmd.io/_uploads/BkBNOYGXlx.jpg)

`7JVV`と読めるコールサインっぽいものがある
調べる
https://www.marinetraffic.com/en/ais/details/ships/shipid:3897814/mmsi:431328000/imo:9767675/vessel:SHINYO_MARU

いろんな番号が出てくるが、[IMO番号](https://ja.wikipedia.org/wiki/IMO番号)が「もし将来、この船が外国に売却されたとしても、変わらない番号」らしい

船の名前は「SHINYO MARU」+ 東京海洋大学で調べた
https://www.s.kaiyodai.ac.jp/special-contents/ship.html

`Diver25{神鷹丸_9767675}`

## geo

### Afghanistan

画像検索させるとGettyの写真っぽいことがわかる
![image](https://hackmd.io/_uploads/Bk4UKKf7xg.png)

左下に画像の管理番号？「1248038111」がある

gettyのサイト+番号で情報がゲットできそう

https://www.gettyimages.co.jp で適当な画像を選ぶと、URLは https://www.gettyimages.co.jp/detail/写真/{タイトル}/{番号} になっていることがわかる

経験則的にこういうURLは最後の番号を変えれば他の部分はリダイレクトされる
https://www.gettyimages.co.jp/detail/写真/hoge/1248038111
↓
https://www.gettyimages.co.jp/detail/%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9%E5%86%99%E7%9C%9F/two-us-soldiers-from-1st-infantry-division-play-a-game-of-%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9%E5%86%99%E7%9C%9F/1248038111
ヨシ！

![image](https://hackmd.io/_uploads/ryAXjYzQgl.png)

しかし、制限されてるみたいで撮影場所がわからない・・・

撮影日はわかる
![image](https://hackmd.io/_uploads/B1IIitMQle.png)

余談だがm01nm01nは問題毎にDiscordのスレッドを立ててメモ書きに使っている。

![image](https://hackmd.io/_uploads/Syl5sYMmge.png)

！！！！！

`Diver25{Camp Bostick_2009-04-16}`
### advertisement

この記事に添付されている画像がどこで撮影されたかを当てる問題。
[Kyiv diz que Rússia usou como recrutas até 180.000 presidiários](https://web.archive.org/web/20250108154113/https://www.noticiasaominuto.com/mundo/2699746/kyiv-diz-que-russia-usou-como-recrutas-ate-180000-presidiarios)

Google Lensに入れたら同様の画角が多数見つかり、サンクトペテルブルグで撮影されたとわかった。しかし、細かい撮影場所はわからなかったため、geoguesserすることにした。

わかったこと
- ТОКИО-CITY (レストラン)
- burger kingが近くにある
- メトロの駅近く？

サンクトペテルブルグにはТОКИО-CITYが有限個あったので総当りした。
![image](https://hackmd.io/_uploads/Hy-nQMrQll.png)

Василеостровская駅の近くのТОКИО-CITYがあたり。
![image](https://hackmd.io/_uploads/ry-lVMr7xe.png)

![image](https://hackmd.io/_uploads/BJTZVzSQel.png)


大体ここらへん。
![image](https://hackmd.io/_uploads/Hyc44GHQxl.png)

余興なんですが、知り合いにロシアの友達がいるので聞いてた。

彼はモスクワに住んでいるにも関わらず、サンクトペテルブルグのどこかということは一瞬でわかったみたい。しかし、具体的な場所はわからないそう。

10分くらいしたら正解の場所を見つけてくれた。
彼は写真の奥に写っている地図を使ったそう。この地図には特徴的な川の流れが書いてある。

![image](https://hackmd.io/_uploads/SyJYVzSQle.png)


Yandex Mapを使って似た形状の場所を探したら見つかったそう。現地人すぎる。

![image](https://hackmd.io/_uploads/HkCjNMHXgl.png)

また、Yandex MapのStreet ViewはGoogle Mapよりも充実しているようで面白い発見だった。
![image](https://hackmd.io/_uploads/Hky1BzHQgl.png)


### elevator

全くわからず、頭を悩ませていた。
しかし、東横インがフランスにもあることを思い出し、海外の可能性が無いかを考えてみた。（m01nm01nは来週からフランスに行ってMidnight Flag CTFのfinalに参加する）

すると、韓国に大量の東横インがヒットした。また、エレベーターの検査や故障履歴について日本語では全くヒットしなかったものの、韓国ではデータベースがあるようで韓国かなぁと当たりをつけることができた。

↓韓国にある全てのエレベーターのデータベース
[국가승강기정보센터](https://www.elevator.go.kr/opn/MainPage.do)


韓国には東横インが有限個あるようなので全部見る。ChatGPTに韓国語で住所を列挙させ、1つ1つ故障履歴を見ていった。

![image](https://hackmd.io/_uploads/HkaCI_Hmee.png)

すると、故障歴が2件あるエレベーターが2つ見つかったのでそれぞれ入れて正解した。CTFではなく本当のOSINTなら、解体工事の写真と照らし合わせて確認するべきなんだろう。

[승강기통합검색 - 국가승강기정보센터](https://www.elevator.go.kr/opn/info/ComElvtrNumAddrNewL01.do?wccPrm=s4KKuwE0iGU1yIU4iiDy8tlMB1uC3c%2BtMhF%2FsXJPUM%2B1L5VbGZ68Bc03pD1pNHtl2Ofgbj4VlAg889apXS%2FYKKuE3%2BthPzrqXT7T3WtK26rDzHc7eHNyuriGjjBnPjsDD8ZeHvGrO80P8hNp9TkGK2AwwdVs1UtgQc%2BW07kCyyTHYavsHXd34jdl7CKEgHmEzva82jcVBbUfaAXTHJR%2BSWX5PhQ5FF0bHNYnV1lNwSnvFzZHXMpgye1BxX8ZSjFO#)

`Diver25{20230810_20241124_8019148}`

### hole

画像の穴があった場所はどこかを当てる問題。
![hole](https://hackmd.io/_uploads/HkSdEBrQee.png)
Google レンズで画像を検索すると以下の動画がヒット
https://www.youtube.com/watch?v=zIKAn8yDkpA

動画からわかったこと
　撮影場所は西山大同(山西省大同市)
 　滑走路？らしきところで撮影されている
  
滑走路っぽいので「中国 机场」で中国の空港を検索。
![スクリーンショット 2025-06-10 142237](https://hackmd.io/_uploads/r11B-rSXxg.png)
ウィキペディアでよさげな表を発見。空港名をgoogle mapで検索してもそれっぽい滑走路が見つからない。「空军灵丘场站」だけgoogle mapでヒットしなかった。日本語に訳すと「霊丘空軍基地」らしいので、地名っぽい「霊丘」だけで検索すると山西省大同市霊丘県があるらしい。
![スクリーンショット 2025-06-10 143816](https://hackmd.io/_uploads/Bkh3Brr7gl.jpg)
拡大して探すとそれっぽい滑走路をみつけた。
![スクリーンショット 2025-06-10 144413](https://hackmd.io/_uploads/BJBKUSB7ll.jpg)
動画からおおよその穴の位置を特定。
![スクリーンショット 2025-06-10 144444](https://hackmd.io/_uploads/Sy0fwBBmgl.jpg)
![スクリーンショット 2025-06-10 144731](https://hackmd.io/_uploads/H11ZvSHmee.png)

### night_street

チームメートがクリニックに見えると言っていたので補完して画像検索

![Screenshot_20250609_100901](https://hackmd.io/_uploads/S1s4NhQ7le.png)


![Screenshot_20250609_100919](https://hackmd.io/_uploads/SyjSV3mQll.png)


### what3slashes

> この画像が撮影されたとき、正面に家が3軒、右手に家が1軒あった。
それから少し経った、ある月の初旬にこの場所にもう一度訪れてみた。そのときには、正面左側に家が1軒増えていて、正面右側にもう1軒が建設中であった。その時点で、建設中の家に屋根はなかったが、黒っぽい屋根を作る予定だという。
「ある月の初旬」とは何年の何月のことだろうか。
Flag形式 : Diver25{YYYY/MM} (e.g. Diver25{2025/06})

![image](https://hackmd.io/_uploads/SJbXOAG7xl.png)

何を言っているのかよくわからなかったが、場所を特定した。

写真に写っているのは`what3words`システムに使われる紙らしい。
`what3words`とは、地球上を3m x 3mの正方形に分割し、場所ごとに3語の組合せを割り当てて位置を示すシステムのことらしい。
モンゴルのように住所が明確でない地域の郵便配達に役立つらしい。頭良い。

ところで、3つの単語は`Бумба цогц бататгав`らしい。

入力するとモンゴルのウランバートル付近の場所がヒットした。

{%preview https://what3words.com/comedians.masking.bonkers %}

屋根を見ないといけないらしいので、Google Earthで遡った。（写真はGoogle Erathから）

最新の衛星画像をみてもピンとこない。
![image](https://hackmd.io/_uploads/B1NHY0fmex.png)


遡っていたら建設途中の家を見つけた。

2018年10月30日
![image](https://hackmd.io/_uploads/rkSVcAG7ll.png)

2018年11月30日
![image](https://hackmd.io/_uploads/H15U90fQlg.png)

11月初旬時点では完成していないので2018/11が答え。

`Diver25{2018/11}`


### convenience
大前提として、この問題は「約」100mという曖昧な距離設定であることを念頭に置かないといけない(1敗)

OSMで公園と登録されているもののうち、コンビニとスーパーがそれぞれ約100m圏内にあるものを全部探せば、あとはスーパー-コンビニ間が約100m圏内に入ってるか確認する形で人力で解けそう。
コンビニとスーパーの定義が曖昧だったのでOSMでそのようなものがないか調べたところ、`shop=convenience`と`shop=supermarket`が存在することが分かった。

というわけで、Overpass APIを使用し、青森県にあるすべての公園・コンビニ・スーパーを取得したうえで、すべての公園に対して周囲にコンビニやスーパーが120m圏内にあるかを確認するプログラムを（Geminiが)作成した。
:::spoiler ソースコード
```python=
import requests
import json
from geopy.distance import geodesic
from collections import defaultdict

# Overpass APIのエンドポイント
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# 青森県内の公園、コンビニ、スーパーを取得するOverpass QLクエリ
# タイムアウトを90秒に設定
OVERPASS_QUERY = """
[out:json][timeout:90];
area["name"="青森県"]->.aomori;
(
  node["leisure"="park"](area.aomori);
  way["leisure"="park"](area.aomori);
  relation["leisure"="park"](area.aomori);
  node["shop"="convenience"](area.aomori);
  way["shop"="convenience"](area.aomori);
  relation["shop"="convenience"](area.aomori);
  node["shop"="supermarket"](area.aomori);
  way["shop"="supermarket"](area.aomori);
  relation["shop"="supermarket"](area.aomori);
)->.all;
.all out center;
"""

def get_osm_data():
    """Overpass APIからデータを取得する"""
    print("OpenStreetMapからデータを取得中...（少し時間がかかる場合があります）")
    try:
        response = requests.get(OVERPASS_URL, params={'data': OVERPASS_QUERY})
        response.raise_for_status()  # エラーがあれば例外を発生させる
        print("データの取得が完了しました。")
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"データ取得中にエラーが発生しました: {e}")
        return None

def parse_elements(data):
    """取得したデータを施設の種類ごとに分類する"""
    parks = []
    conveniences = []
    supermarkets = []

    for element in data.get('elements', []):
        tags = element.get('tags', {})
        name = tags.get('name', '名称不明')
        
        # 緯度・経度の取得
        if 'center' in element:
            lat, lon = element['center']['lat'], element['center']['lon']
        elif 'lat' in element and 'lon' in element:
            lat, lon = element['lat'], element['lon']
        else:
            continue

        item = {'name': name, 'pos': (lat, lon)}

        if tags.get('leisure') == 'park':
            parks.append(item)
        elif tags.get('shop') == 'convenience':
            conveniences.append(item)
        elif tags.get('shop') == 'supermarket':
            supermarkets.append(item)
            
    return parks, conveniences, supermarkets

def find_parks_with_nearby_facilities(parks, conveniences, supermarkets, radius_m=100):
    """
    条件に合う公園と、その近くの施設情報を見つける
    """
    print(f"\n半径{radius_m}m以内にコンビニとスーパーがある公園を検索中...")
    
    results = []
    
    for park in parks:
        park_pos = park['pos']
        nearby_conveniences = []
        nearby_supermarkets = []

        # 近くのコンビニを検索
        for conv in conveniences:
            distance = geodesic(park_pos, conv['pos']).meters
            if distance <= radius_m:
                nearby_conveniences.append(conv)
        
        # 近くのスーパーを検索
        for superm in supermarkets:
            distance = geodesic(park_pos, superm['pos']).meters
            if distance <= radius_m:
                nearby_supermarkets.append(superm)
        
        # 両方が見つかった場合、結果に追加
        if nearby_conveniences and nearby_supermarkets:
            results.append({
                'park': park,
                'conveniences': nearby_conveniences,
                'supermarkets': nearby_supermarkets
            })
            
    return results

def main():
    """メイン処理"""
    osm_data = get_osm_data()
    if not osm_data:
        return

    parks, conveniences, supermarkets = parse_elements(osm_data)
    
    print(f"\n--- データ概要 ---")
    print(f"公園の数: {len(parks)}")
    print(f"コンビニの数: {len(conveniences)}")
    print(f"スーパーの数: {len(supermarkets)}")
    
    found_results = find_parks_with_nearby_facilities(parks, conveniences, supermarkets, 120)
    
    print("\n--- 検索結果 ---")
    if found_results:
        print(f"条件に合う公園が {len(found_results)} 件見つかりました。")
        for i, result in enumerate(found_results):
            park = result['park']
            print("-" * 30)
            print(f"{i+1}. 公園: {park['name']} (緯度: {park['pos'][0]:.6f}, 経度: {park['pos'][1]:.6f})")
            
            print("  近くのコンビニ:")
            for conv in result['conveniences']:
                dist = geodesic(park['pos'], conv['pos']).meters
                print(f"    - {conv['name']} (約{dist:.0f}m)")

            print("  近くのスーパー:")
            for superm in result['supermarkets']:
                dist = geodesic(park['pos'], superm['pos']).meters
                print(f"    - {superm['name']} (約{dist:.0f}m)")
            
    else:
        print("条件に合う公園は見つかりませんでした。")

if __name__ == '__main__':
    main()

```
:::

:::spoiler 実行結果
```
OpenStreetMapからデータを取得中...（少し時間がかかる場合があります）
データの取得が完了しました。

--- データ概要 ---
公園の数: 910
コンビニの数: 548
スーパーの数: 286

半径120m以内にコンビニとスーパーがある公園を検索中...

--- 検索結果 ---
条件に合う公園が 3 件見つかりました。
------------------------------
1. 公園: 駅前公園 (緯度: 40.827282, 経度: 140.734803)
  近くのコンビニ:
    - セブン-イレブン (約54m)
  近くのスーパー:
    - 嶋中商店 (約51m)
    - マルシェ アサムボン (約73m)
------------------------------
2. 公園: 扇町緑地 (緯度: 40.584433, 経度: 140.500164)
  近くのコンビニ:
    - セブン-イレブン (約87m)
  近くのスーパー:
    - いとく (約109m)
------------------------------
3. 公園: 旭町児童遊園地 (緯度: 40.810359, 経度: 140.446959)
  近くのコンビニ:
    - ローソン (約88m)
  近くのスーパー:
    - 五所川原駅前市場 (約120m)
```
:::


一番経度が小さい扇町緑地が該当しそうだったので実際にGoogleMapで距離を確認したところ、コンビニ-スーパー間も問題なさそうだったので、OSMの番号を提出
`Diver25{759381890}`



### Talentopolis

この赤道ギニアのイベントで撮影されたステージの場所を特定する問題。

https://www.guineaecuatorialpress.com/noticias/primera_edicion_de_talentopoli

赤道ギニアのJPLという団体が若者を集めてイベントをやっているらしい。インスタにも情報が上がっていた。

https://www.instagram.com/p/C_vO9QyI6CW/?__d=1&img_index=2 

場所は`A2 SAN JUAN (Malabo)`というところらしい。Google Mapsに入れても出てこない。もちろん、Googleで検索しても出てこなかった。そもそも、San Juanという地名は赤道ギニアで見つからなかった。そのため、まず`Malabo San Juan`といったクエリで情報を集めることにした。

すると、次の動画がヒットした。
[VIVIENDAS SOCIALES DE SAN JUAN MALABO - YouTube](https://www.youtube.com/watch?v=YVkiYkFndPE)

ここに写っているマンションに見覚えがある。下の記事で貼られた写真に写っているマンションと似ている気がする。

[Inicia el proyecto Talentópolis en el barrio San Juan de esta ciudad capital](https://ahoraeg.com/cultura/2024/09/10/inicia-el-proyecto-talentopolis-en-el-barrio-san-juan-de-esta-ciudad-capital/)

(https://ahoraeg.com/cultura/2024/09/10/inicia-el-proyecto-talentopolis-en-el-barrio-san-juan-de-esta-ciudad-capital より)
![image](https://hackmd.io/_uploads/ryOip6Xmeg.png)


(https://www.youtube.com/watch?v=YVkiYkFndPE より)
![image](https://hackmd.io/_uploads/rJMn6a77lx.png)

YouTubeのタイトルになっていた `VIVIENDAS SOCIALES DE SAN JUAN MALABO`はGoogle mapsでヒットした。


画角を合わせると4箇所に絞れる。
- 駐車場がある
- 真後ろにビル、左手にもビルが見える

さらに、ステージは右手に一軒家のような建物が見えたため、矢印のついている場所で確定させた。

![image](https://hackmd.io/_uploads/HkLLQUNQeg.png)
(Google Earthより)

![image](https://hackmd.io/_uploads/H1uTm8E7eg.png)


## recon

### 00_engineer

twitterのbioにgithub pagesのポートフォリオが載っていた.

{%preview https://x.com/kodai_sn %}

https://kodai-sn.github.io/

### 01_asset

`Mizuki Sekozaki`でインスタを検索したら社長のアカウントが偶然でてきた。

https://www.instagram.com/mizuki1206edelweiss/

昔の投稿を眺めていたら、スマートフォンに関する投稿が見つかった。

{%preview https://www.instagram.com/p/DHAMO0zPYjt/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA== %}

![image](https://hackmd.io/_uploads/Sk9Qo0fmel.png)

`Diver25{MN24-P113}`

HACK'OSINTで得られた教訓の一つの「困ったらInstagram, Mastdon, Bluesky, Twitter, Facebookを探す」が活きたと思う。

### 02_recruit

採用ページどこだろうと思って、LinkedInやFacebookを探したが見つからなかった。

HPのcontactページにCareerがあった。今は閉じているみたい。つまり、昔は開いていたということっぽい。
https://magneight.com/contact.html

https://archive.md/20250410163929/https://magneight.com/contact.html

採用ページにGoogle Docsへの誘導があった。

https://archive.md/o/sD2R0/https://docs.google.com/document/d/1aKBTbwtt01StVTf76JRCZyL0mp4hn5FZkFwPJ56xZRc/edit?usp=sharing

Google Docsはオーナーが見えるのでガチャチャやったら見えた。Google Drive側からアクセスして`File information -> Details`から見える。

![image](https://hackmd.io/_uploads/r1gNhRf7ex.png)

`makoto.u.sunflower@gmail.com` が出てきた。
GHuntするとGoogle Mapsにレビューを投稿していることがわかった。

https://www.google.com/maps/contrib/100984246270086465803/reviews/@35.6910691,139.7027701,711m/data=!3m2!1e3!4b1!4m3!8m2!3m1!1e1?entry=ttu&g_ep=EgoyMDI1MDYwNC4wIKXMDSoASAFQAw%3D%3D

![image](https://hackmd.io/_uploads/H1y5nCfQex.png)



`Diver{Makoto Uchigashima}`

ふと、1年前のDIVER OSINTの`Jun Koda`の問題を思い出した。その問題もGHuntすれば一瞬の問題だったが、当時はGHuntを知らずに大苦戦した覚えがある。メールアドレスからレビューが全部見えると知ったときの驚きをwriteupを書くまで忘れていた。


### 03_ceo

社長がGitハンズオンをやってくれたというポストを見つけた。
https://x.com/kodai_sn/status/1914562813928071334

GitHubにメールアドレスがあるだろうと考え、Gitハンズオンの情報を探す。
https://x.com/kodai_sn/status/1895844067323629964

![image](https://hackmd.io/_uploads/H1zIMX47eg.png)
フォークさせている。ここから辿れそう。

https://github.com/kodai-sn/fork-practice/forks
社長のGithubアカウントらしきものがある。

Gitにはメアドが必要なので、`@users.noreply.github.com`のアドレスじゃないことを祈りつつ、あとはこいつをcloneして`git log`するだけ。

![image](https://hackmd.io/_uploads/SkjlQ7E7xg.png)

`Diver25{mizuki1206anemone@gmail.com}`

### 04_internal

magneight.comのIPを調べる。

```shell
┌──(kali㉿LAPTOP)-[~]
└─$ dig magneight.com

; <<>> DiG 9.20.4-4-Debian <<>> magneight.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 21219
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;magneight.com.                 IN      A

;; ANSWER SECTION:
magneight.com.          3600    IN      A       202.212.71.93
```
202.212.71.93をshodanする(Censysとかでもいけると思うが)
https://www.shodan.io/host/202.212.71.93
![image](https://hackmd.io/_uploads/Bk8Jxm4Qxl.png)
Giteaくん、こんにちは。
フッターにバージョンがある
![image](https://hackmd.io/_uploads/Sknle747ll.png)

`Diver25{1.24.0+dev-303-gd88b012525}`


### 05_designer

### 06_leaked

## transportation

### 36_years_ago

### air2air

ウィングレットからstarlux航空であることがわかる.

![image](https://hackmd.io/_uploads/ByZDLhm7el.png)

FrightRadar24のシルバー会員になり, playbackをすることでstarlux航空機と並走し高度の高い飛行機を発見した.

![Screenshot_20250609_101609](https://hackmd.io/_uploads/rJVJL2mQex.png)

### listen

### next_train
音声を聞くと以下の情報がわかる
- 久里浜行きの列車が存在すること
- 15番線から発着すること

久里浜行の普通電車は横須賀線であり、横須賀線が15番線から発着するのは品川駅であるのはそのままググると出てくる。
`Diver25{品川駅}`


### platform
まずは、ホームの乗車位置の目印に着目した。そこから以下の情報が得られる。
- JR東日本の駅であること
- 6両編成、10両編成、12両編成が停車すること
- 弱冷房車が9号車に設定されていること
- 路線カラーがオレンジである可能性があること
- 停車のマークの付け方的に、12両編成は後から増えてそう(推測)

路線カラーから考えると、中央線である可能性が高いと考えられる。
中央線は今年からグリーン車を完全導入したことにより10両編成から12両編成になっており、停車マークの10両/12両に関して合理的な説明がつく。
また、中央線の弱冷房車が9号車であることもGoogle検索するとすぐ出てくる。

そこで次に、6両編成が何を指すのかの調査を行ったところ、以下の知恵袋の回答が出てきた。
https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q14298360529
この投稿によると、立川より下り方面であり、五日市線直通の列車が通る駅であると考えられる。

ここまで絞り込めたなら、あとは立川駅以降について全探索を行う。
https://www.youtube.com/watch?v=3T_L4NMkkvE

![image](https://hackmd.io/_uploads/HJ4Sif7Xxx.png)
画像と同じ景色が見つかったので、これが答えである。
`Diver25{牛浜駅}`


### sanction

> 2024年10月25日、制裁下にあるロシア船籍のRORO船「ANGARA」がある港湾に停泊していることが衛星画像で確認された。
停泊位置を答えよ。

まずMarin Trafficで調べてみる。見つかったが、途中の軌跡をアクセスできなかった。

[Vessel Characteristics: Ship ANGARA (Ro-Ro/Container Carrier) Registered in Russia - Vessel details, Current position and Voyage information - IMO 9179842MMSI 9179842Call Sign UBYT2 | AIS Marine Traffic](https://www.marinetraffic.com/en/ais/details/ships/shipid:755977/mmsi:273210440/imo:9179842/vessel:ANGARA)

具体的な日付が記されていたのでどこかレポートがあるかなと気になった。
```
russia angara 2024 oct 25 filetype:pdf
```

外務省の多国間制裁チームのレポートがヒットした。

{%preview https://www.mofa.go.jp/mofaj/files/100853978.pdf %}

あった！
`Russian-flagged ANGARA ata Rajin Port, DPRK (Oct. 25, 2024)`

Rajin Portにフォーカスして衛星画像通りに配置すればOK

![image](https://hackmd.io/_uploads/SkDUPRM7gl.png)


多国間制裁チームのレポート、内容が丁寧で面白くて勉強になりそうなので個人的に読んでみるつもり。
[多国間制裁監視チーム（MSMT）第1回報告書の公表｜外務省](https://www.mofa.go.jp/mofaj/press/release/pressit_000001_02208.html)


## history

### bridge

{%preview https://www.youtube.com/watch?v=fRMi8TXQRuo %}

動画が撮影された場所は豊肥本線の上で竜田口の手前だった。

![image](https://hackmd.io/_uploads/S1tUNAf7xg.png)

第二白川橋梁というらしい。

[歴史的鋼橋: T2-030 第二白川橋梁](https://www.library-jsce.jp/archives/jscelib/committee/2003/bridge/T2-030.htm)

気合で色々調べていたら、次のクエリで流用された橋の名前が見つかった。
`熊本 "第二白川" 橋りょう 洪水 復旧 filetype:pdf`

{%preview https://www.nakanihon.co.jp/gijyutsu/Shimada/BridgeData/f43KM.pdf %}

`Diver25{澱川橋梁}`

### internment

藤井富太郎氏が釈放された収容所と日付を答える問題。チームメンバーが奮闘した末に夢物語を読み始めてから気が狂ってしまった。当時自分は他の問題を解いていたので、日曜日の朝に取り掛かった。

彼に関する本があった。読むしか無い。ここで1980円を失う。

[Amazon.co.jp: 最後の真珠貝ダイバー 藤井富太郎 eBook : リンダ・マイリー, 青木麻衣子, 松本博之, 伊井義人: Kindleストア](https://www.amazon.co.jp/dp/B0B4WGM14Z/)

70ページに全てが書いてありました。
1946年12月10日にビクトリアのタツラ収容所から釈放されたそうです。


`Diver25{1946-12-10_4_Tatura_Victoria}`

多分想定解ではないが、課金したら一瞬で解けてしまった。

## company

### bid

{%preview https://www.omantender.com/tender/drilling-well-bore-supply-installation-pump-and-pipeline-al-bashayer-veterinary-hospital-wilayat-ad-68865d1.php %}
次は、入札の結果を探す。gov.omでググって政府の公式ページに行く。
https://gov.om/en/entities に General Secretariat of the Tender Board(入札委員会事務局)とあるので、それでググり、https://www.gstb.gov.om/en/Pages/GeneralSecretariat.aspx
に行く。ヘッダーの`E-Service > Tendering system`でやっとそれっぽいシステムのページに行ける。
Floated、Opened、Awardedなどがあるがとりあえず全部さがしてみる。
Tender No.に`1190/2023/MAFWR/DGAWRDK-94- Recall - 1`を入れて探すと、Awardedで見つかる。

![image](https://hackmd.io/_uploads/ryaA0MEQxg.png)

ターゲットの公募はを見つけた.3位はGolden Sands社なのでABOUT USページからCEO.
![Screenshot_20250609_101328](https://hackmd.io/_uploads/SJ7BHh77eg.png)

{%preview https://goldensandsoman.com/about-us/ %}

### expense

## hardware

### UART

> この商品のイーサネットスイッチコントローラに直接UARTでアクセスを試みたい。どの部品の、どのピンにアクセスすればいいだろうか。
PCB上の部品番号 と、その部品の UART RX / UART TX ピン番号 を答えよ。ピン番号は部品の仕様に準拠せよ。
なお、ピンヘッダやコネクタが利用可能な場合でも、イーサネットスイッチコントローラのピン番号を答えてほしい。
Flag形式: Diver25{PCB上の部品番号_UART RXピン番号_UART TXピン番号}
（例えば、イーサネットスイッチコントローラが T21 という部品番号で、RXのピン番号が120、TXのピン番号が150であれば、Diver25{T21_120_150}となる）

商品とは、`TP-Link Archer AX20 AX1800 V2 Dualband Wi-Fi 6 Router`のことである。
phoneを解いたあとだったのでFCCのページを見れば何かわかるんじゃないかという勘が働く。

最終的にデータシートを見ればUARTのピンがわかると思ったので、まずプロセッサを調べなきゃいけない。

あった。

https://fccid.io/TE7AX20V2

今度は中身を見たいので`Internal Photos`をみてみる。

https://fccid.io/TE7AX20V2/Internal-Photos/10-Internal-Photos-5053132

ありました。

![image](https://hackmd.io/_uploads/SJ9Sv5MQxx.png)

RTL8367SのデータシートをみてUARTのピンを調べますか。

{%preview https://www.lcsc.com/datasheet/lcsc_datasheet_2103121437_Realtek-Semicon-RTL8367S-CG_C2760849.pdf %}

ありました。
![image](https://hackmd.io/_uploads/SyuwDqfQlg.png)

また、PCB上の部品番号はプロセッサ左下にある`U7`かな。

`Diver25{U7_45_46}`

PCB基板で回路設計をした経験に救われたと思う。経験に感謝。思ったよりもスパスパ解けて気持ちよかった。


### phone

EMI試験をした携帯電話のシリアル番号を見つける。

![image](https://hackmd.io/_uploads/SJ2OH5zQxl.png)

SH-01Jらしい。レポートが必要だと思い、「EMI SH-01J !pdf」等で調べたがハズレ。
ChatGPTに聞くと技適のページに実験レポートあるんじゃないという話で調べるも、何も詳細が書いていない。

携帯電話だったら日本以外もあり得ると思い、海外版技適を調べたらFCCが見つかった。

「SH-01J　FCC」でヒット。

{%preview http://blogofmobile.com/article/68417 %}

`APYHRO00240`らしい。

FCCのページもあった。

{%preview https://fccid.io/APYHRO00240 %}

`Pt15B_APYHRO00240_TestReport_11380556H-B.pdf`を読んでみる。
"serial"でPDFを検索したら番号、ありました。

`Diver25{004401/11/583099/0}`



## military

### object

wikimapiaで場所を調べたらПД-72と出てきました。
![image](https://hackmd.io/_uploads/By-Le9GXll.png)


{%preview https://wikimapia.org/#lang=en&lat=69.215298&lon=33.381143&z=15&m=w&search=69.216246N%2C%2033.378242E %}

また、ПД-72で調べたらプロジェクト番号も同時に出てきました。

{%preview http://militaryrussia.ru/blog/topic-822.html %}

Diver25{13560_ПД-72}

### worker

解けなかった。Yandexもうちょい深堀りすればよかっただけっぽい。

Deep Researchでも解けませんでした。

### radar

> 画像に写っているものは、福建省に存在する、中国人民解放軍東部戦区のレーダー施設であると考えられる。
公式な情報は明らかにされていないものの、オンライン上で中国の軍事を分析している人々がこの基地を運用する部隊と分隊の番号を特定しているらしい。
もちろん、オンライン上の情報だけを鵜呑みにするわけにはいかないが、ひとまず検討する価値はあるだろう。
その情報を探り当て、教えてほしい。
Flag形式: Diver25{部隊番号_分隊番号}（例えば12345部隊の56分隊のとき、Diver25{12345_56} となる）

画像は`25°47'50"N   119°36'46"E`の軍事施設を写している。

wikmapiaより、その場所は`CEIEC Surface Wave-OTH (SW-OTH) Radar (Receiver)`とのこと。

https://wikimapia.org/#lang=en&lat=25.800818&lon=119.576054&z=13&m=w&search=chinese%20rader 

調べてると、緯度経度が近い場所を言及している記事も見つかった。この記事はUnit 95980と言っている。（違いました）

[Over-The-Horizon Surface Wave Radar (HFSWR)](https://www.globalsecurity.org/wmd/world/china/oth-swr.htm)

その時点では裏付けは弱いものの95980と信じ込んで分隊番号を探していた。疑わしい番号を投げたが全てはずれた。

最終的に、ChatGPTのDeep Researchによって答えが出た。

https://chatgpt.com/share/68444de9-3878-8010-b38c-b27b035b31cd　

プロンプトとして問題文 + wikimapiaによる場所の説明を入れました。ChatGPTが複数の情報源から答えを割り出したようで、

物や場所を対象とした調査は利用できる資源が多いからこそ正解できたのかな。HACK'OSINTの大会のように人を対象とした調査では全然上手くいかないので。

`Diver25{92985_84}`


## report

# 感想

## chizu

- 楽しかった。
- この情報にたどり着くためにどんな情報源を使うとよいかと考えてアプローチを組み立てていったのが功を奏した。
- 来年は全完したい！！！


## komoda chieko

- fiction based on the fact is not based on the fact.
- "No need to use paid information." means money resolve everything.

## naotiki
OSINTで超Guess問を解かされたことがあり、それからOSINTが超苦手になっていたがDIVER OSINT CTFはそんな質の悪い問題はなく、楽しかった。（し、もちろん難しかった！！）
次も参加したい

## kokastar
僕がリンガーハット全探索した時間は何のために存在したんでしょうか...
解けた問題はそこまで多くないけど、自分の知識と合わせてチームに貢献できたので楽しかった。また参加したいが、次回こそは中間テスト直前&学生ロボコン当日でないことを祈る。

## rira
あまり貢献できませんでしたが、先輩方と参加できて楽しかったし、めっちゃ参考になりました。知識を増やして、来年も参加したいです。

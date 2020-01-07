# cordova-plugin-nifty-push-icon

## プラグインの機能

ncmb-push-monaca-pluginプラグインと合わせて使用するプラグインです。
通知領域に表示するアイコンを、アプリアイコンとは別に設定出来るようになります。
MonacaおよびCordovaで利用出来ます。
Monacaの場合、カスタムプラグインとなるため、Goldプラン以上のアカウントが必要になります。

Cordova 5およびCordova 6.2のプロジェクトでは、本プラグインのバージョン0.5をお使いください。

Cordova 6.5のプロジェクトでは、本プラグインのバージョン0.7もしくはそれ以後をお使いください。

## Monacaでの簡単な使い方

プロジェクトに本プラグインを組み込みます。
また、Niftyプッシュ通知プラグインv2.x.x (ncmb-push-monaca-plugin)も必要になります。

プロジェクトのwwwディレクトリの直下にアイコンファイルとして

    nifty_push_icon.png

ファイルを置いて下さい。
すると、プッシュ通知時のアイコンがnifty_push_icon.pngになります。
（本プラグインをインポートした状態で、アイコンファイルを置かないと、ビルドエラーになりますので、
ご注意下さい）


## 高度な使い方

アイコンのファイル名や置き場所を変更したい場合は、config.xmlを編集して下さい。
例えば、config.xmlに

    <preference name="niftyPushIcon" value="www/my_icon.png"/>

とすると、www/my_icon.pngが使用されます。

## 解像度別のアイコンを指定したい場合

解像度ごとに別のアイコンを使いたい場合は、config.xmlに以下のように記述して下さい。

    <preference name="niftyPushIcon-ldpi" value="www/my_icon_ldpi.png"/>
    <preference name="niftyPushIcon-mdpi" value="www/my_icon_mdpi.png"/>
    <preference name="niftyPushIcon-hdpi" value="www/my_icon_hdpi.png"/>
    <preference name="niftyPushIcon-xhdpi" value="www/my_icon_xhdpi.png"/>

すると、それぞれの解像度のアイコンが使用されるようになります。

## テクニカルノート

このプラグインでは、Prepare前のフックスクリプトにより、指定された画像をres/drawableディレクトリに
コピーしています。
コピー元のファイル名がなんであっても、コピー先はnifty_push_icon.pngファイルとなります。

Cordova 6.5からは、drawableではなくmipmapにおくようになりました。

## Cordova 9以後について

Cordova 9以後であれば、このプラグインを使わなくてもconfig.xmlだけで、通知アイコンを設定することができます。
（正確には、Cordova 9以後というより、プラットフォームバージョンがCordova-Android 8.0.0以後の場合）

例：まず、config.xmlにリソースを設定します。

```
<resource-file src="res/android/icon_white/ldpi_my_icon.png" target="app/src/main/res/drawable-ldpi/my_icon.png" />
<resource-file src="res/android/icon_white/mdpi_my_icon.png" target="app/src/main/res/drawable-mdpi/my_icon.png" />
<resource-file src="res/android/icon_white/hdpi_my_icon.png" target="app/src/main/res/drawable-hdpi/my_icon.png" />
<resource-file src="res/android/icon_white/xhdpi_my_icon.png" target="app/src/main/res/drawable-xhdpi/my_icon.png" />
```

この場合、`res/android/icon_white` ディレクトリ以下に、`ldpi_my_icon.png`、`mdpi_my_icon.png`、`hdpi_my_icon.png`、`xhdpi_my_icon.png`を配置します。

また、`application`の`AndroidManifest.xml`を変更するために、config.xmlに次を追加します。

```
<custom-config-file parent="./application" target="AndroidManifest.xml">
    <meta-data android:name="smallIcon" android:resource="@drawable/my_icon" />
    <meta-data android:name="smallIconColor" android:value="#4040EF" />
</custom-config-file>
```
(my_iconのところは、リソースのところで設定した画像ファイル名から`.png`を取り除いたものです。また、smallIconColorの値は適時変更してください）

上記はcustom-configプラグインを使っています(Monacaではデフォルトで使用）が、通常のconfig-fileでも同様にできると思います。その場合、次のようになると思います。

```
<config-file target="AndroidManifest.xml" parent="/manifest/application">
    <meta-data android:name="smallIcon" android:resource="@drawable/my_icon" />
    <meta-data android:name="smallIconColor" android:value="#4040EF" />
</config-file>
```

蛇足になりますが、Cordova 7.1でCordova-Android 7.x.xを使う場合は、上記のリソースタグのtargetを `target="app/src/main/res/drawable-ldpi/my_icon.png"` ではなく `target="platforms/android/res/drawable-ldpi/my_icon.png` のようにすれば動作すると思います。 

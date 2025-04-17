


# AmazonProduct
## Extract from URL
* productASIN
* html / source code

## Extract from a HTML Source
* productASIN
* productImageID
* productImageURL
  * (baseURL, suffix)
* productTitle(s) / description
  * productShortTitle
  * productName
* productBrand
* productVariantSelection (EX: size/color)
* productSizingInfo ( the sizing table provided with some products )
* productVariantSizingInfo (a row from productSizingInfo)
* productPrice
* shippingSpeed
* shipable (to current address)

# generate (from AmazonProduct)

* productASINURL
* productTitleURL
* productImageURL(x, y, q)
* markdownLinkShortTitle
* markdownLinkMinimal
* markdownLinkList
# actions (from AmazonProduct)
* fetchProductImage(dir)
* fetchProductHTML(dir)
* writeToJSONFile

* markdown link (shortTitle version)
  * [productTitle.short](productMinURL)
* markdown link (min version)
  * [productTitle.short](productMinURL)
* html image link
  * <a href="productURL"><img src="productImage"></a>
* markdown image link 
  * ![asin/productImageID](productImageURL)

* markdown link 
  * selection
  * price
  * shipping

* markdown link
  * size / color
    * price
    * shipping
    * size specifis


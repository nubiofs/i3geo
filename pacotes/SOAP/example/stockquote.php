<html><body>
<?
//
// +----------------------------------------------------------------------+
// | PHP Version 4                                                        |
// +----------------------------------------------------------------------+
// | Copyright (c) 1997-2002 The PHP Group                                |
// +----------------------------------------------------------------------+
// | This source file is subject to version 2.02 of the PHP license,      |
// | that is bundled with this package in the file LICENSE, and is        |
// | available at through the world-wide-web at                           |
// | http://www.php.net/license/2_02.txt.                                 |
// | If you did not receive a copy of the PHP license and are unable to   |
// | obtain it through the world-wide-web, please send a note to          |
// | license@php.net so we can mail you a copy immediately.               |
// +----------------------------------------------------------------------+
// | Authors: Shane Caraveo <Shane@Caraveo.com>   Port to PEAR and more   |
// | Authors: Dietrich Ayala <dietrich@ganx4.com> Original Author         |
// +----------------------------------------------------------------------+
//
// $Id: stockquote.php,v 1.1.1.2 2006/06/08 14:56:40 06292871800 Exp $
//
// include soap client class
include("SOAP/Client.php");
//include("../Client.php");

print "<br>\n<strong>wsdl:</strong>";
$soapclient = new SOAP_Client("http://services.xmethods.net/soap/urn:xmethods-delayed-quotes.wsdl","wsdl");
print $soapclient;
print_r($soapclient->call("getQuote",array("symbol"=>"ibm")));
print "\n\n";

if (extension_loaded('overload')) {
	print "\n<br><strong>overloaded:</strong>";
	$ret = $soapclient->getQuote("ibm");
	print_r($ret);
	print "\n\n";
}
unset($soapclient);

print "\n<br><strong>non wsdl:</strong>";
$soapclient = new SOAP_Client("http://services.xmethods.net:80/soap");
$ret = $soapclient->call("getQuote",array("symbol"=>"ibm","urn:xmethods-delayed-quotes","urn:xmethods-delayed-quotes#getQuote"));
print_r($ret);
print "\n\n";
unset($soapclient);

?>
</html></body>

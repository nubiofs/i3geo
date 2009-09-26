<?php
/*
Title: classe_analise.php

Gera an�lises espaciais, como buffer, calculo de centr�ides, etc.

Licenca:

GPL2


I3Geo Interface Integrada de Ferramentas de Geoprocessamento para Internet

Direitos Autorais Reservados (c) 2006 Minist�rio do Meio Ambiente Brasil
Desenvolvedor: Edmar Moretti edmar.moretti@mma.gov.br

Este programa � software livre; voc� pode redistribu�-lo
e/ou modific�-lo sob os termos da Licen�a P�blica Geral
GNU conforme publicada pela Free Software Foundation;
tanto a vers�o 2 da Licen�a.
Este programa � distribu�do na expectativa de que seja �til,
por�m, SEM NENHUMA GARANTIA; nem mesmo a garantia impl�cita
de COMERCIABILIDADE OU ADEQUA��O A UMA FINALIDADE ESPEC�FICA.
Consulte a Licen�a P�blica Geral do GNU para mais detalhes.
Voc� deve ter recebido uma c�pia da Licen�a P�blica Geral do
GNU junto com este programa; se n�o, escreva para a
Free Software Foundation, Inc., no endere�o
59 Temple Street, Suite 330, Boston, MA 02111-1307 USA.

Arquivo:

i3geo/classesphp/classe_analise.php
*/
/*
Classe: Analise

*/
class Analise
{
	/*
	Variavel: $mapa
	
	Objeto mapa
	*/
	protected $mapa;
	/*
	Variavel: $arquivo
	
	Arquivo map file
	*/
	protected $arquivo;
	/*
	Variavel: $layer
	
	Objeto layer
	*/
	protected $layer;
	/*
	Variavel: $nome
	
	Nome do layer
	*/
	protected $nome;
	/*
	Variavel: $diretorio
	
	Diret�rio do arquivo map_file
	*/
	protected $diretorio;
/*
Function: __construct

Cria um objeto Analise 

parameters:

$map_file - Endere�o do mapfile no servidor.

$tema - Nome do tema que ser� processado
*/  
	function __construct($map_file,$tema="",$locaplic="")
	{
  		//error_reporting(E_ALL);
  		if(file_exists($locaplic."/funcoes_gerais.php"))
  		include_once($locaplic."/funcoes_gerais.php");
  		else
  		include_once("funcoes_gerais.php");
  		$this->locaplic = $locaplic;
  		$this->mapa = ms_newMapObj($map_file);
  		$this->arquivo = $map_file;
  		if($tema != "" && @$this->mapa->getlayerbyname($tema))
 		$this->layer = $this->mapa->getlayerbyname($tema);
  		$this->nome = $tema;
  		$this->diretorio = dirname($this->arquivo);
	}
/*
Method: salva

Salva o mapfile atual 
*/	
 	function salva()
 	{
	  	if (connection_aborted()){exit();}
	  	$this->mapa->save($this->arquivo);
	}

/*
function: analiseDistriPt

Gera an�lise de distribui��o de pontos.

Executa script R para gerar a imagem.

parameters:
$locaplic - Localiza��o da aplica��o I3Geo

$dir_tmp - Diret�rio tempor�rio do mapserver

$R_path - Onde fica o R

$numclasses - N�mero de classes que ser�o representadas

$tipo - Tipo de an�lise.

$cori - Cor inicial em rgb.

$corf - Cor final em rgb.

$tmpurl - Url com o nome da imagem final

$sigma - desvio padr�o para a op��o kernel

$limitepontos - "TRUE"|"FALSE" limita o resultado ao limite geogr�fico dos pontos se "TRUE" ou ao limite do mapa se "FALSE"

$extendelimite - extende o limite dos pontos em um determinado percentual em rela��o a �rea final de abrang�ncia
Include:
<class.palette.php>
*/
	function analiseDistriPt($locaplic,$dir_tmp,$R_path,$numclasses,$tipo,$cori,$corf,$tmpurl,$sigma="",$limitepontos="TRUE",$tema2="",$extendelimite=5)
	{
		set_time_limit(120);
		//
		//pega os dados do tema dois para as fun��es que o utilizam
		//
		$dados1 = $this->gravaCoordenadasPt($this->nome,$limitepontos,$extendelimite);
		$nomearq = $dados1["prefixoarquivo"];
		$dimx = $dados1["dimx"];
		$dimy = $dados1["dimy"];
		if (isset($tema2) && $tema2 != "")
		{
			$dados2 = $this->gravaCoordenadasPt($tema2,$limitepontos,$extendelimite);
			$nomearq2 = $dados2["prefixoarquivo"];
			$dimx2 = $dados2["dimx"];
			$dimy2 = $dados2["dimy"];
		}
		switch ($tipo)
		{
			//cluster espacial
			case "cluster":
			$this->mapaCluster($nomearq,$nomearq2,$dimx,$dimy,$dir_tmp,$R_path,$locaplic);
			return "ok";
			break;
			//delaunay e voronoi
			case "deldir":
			$this->mapaDeldir($nomearq,$dir_tmp,$R_path,$locaplic);
			$this->deldirDir2shp($nomearq."dirsgs",$dir_tmp,$locaplic);
			$this->deldirDel2shp($nomearq."delsgs",$dir_tmp,$locaplic);
			return "ok";
			break;
			case "kernel":
			$this->mapaKernel($nomearq,$dimx,$dimy,$dir_tmp,$R_path,$locaplic,$sigma);
			break;
			case "densidade":
			$this->mapaDensidade($nomearq,$dimx,$dimy,$dir_tmp,$R_path,$locaplic);
			break;
			case "distancia":
			$this->mapaDistancia($nomearq,$dimx,$dimy,$dir_tmp,$R_path,$locaplic);
			break;
			case "relatorio":
			$r = $this->mapaRelatorioAnaliseDist($nomearq,$dimx,$dimy,$dir_tmp,$R_path,$locaplic);
			return($tmpurl.basename($this->diretorio)."/".basename($nomearq).'.htm');
			break;
		}
		//cria a imagem
		$minmax = criaImagemR($nomearq);
		//cria as cores
		include_once("class.palette.php");
		$cori = RGB2hex(explode(",",$cori));
		$corf = RGB2hex(explode(",",$corf));
		$myPalette=new palette(array($cori,$corf),($numclasses + 1));
		//cria os parametros das classes
		$cls = classesRasterI($minmax[0],$minmax[1],$numclasses,$myPalette->colorRGB);
		if (count($cls) != $numclasses){return("erro.");}
		//adiciona o novo tema
		if (file_exists($nomearq.".png"))
		{
			$novolayer = criaLayer($this->mapa,MS_LAYER_RASTER,MS_DEFAULT,($tipo." (".$this->nome.")"),$metaClasse="SIM");
			$novolayer->set("data",$nomearq.".png");
			$novolayer->set("template","none.htm");
			$novolayer->setmetadata("download","sim");
			//classes
			$numclassesatual = $novolayer->numclasses;
			for ($i=0; $i < $numclassesatual; ++$i)
			{
				$classe = $novolayer->getClass($i);
				$classe->set("status",MS_DELETE);
			}
			for ($i=0; $i < $numclasses; ++$i)
			{
				$classe = ms_newClassObj($novolayer);
				$novoestilo = ms_newStyleObj($classe);
				$ncor = $novoestilo->color;
				$cores = $cls[$i]["cores"];
				$ncor->setrgb($cores[0],$cores[1],$cores[2]);
				$classe->setexpression($cls[$i]["expressao"]);
				$classe->set("name",$cls[$i]["nomeclasse"]);
			}
			$of = $this->mapa->outputformat;
			$of->set("imagemode",MS_IMAGEMODE_RGB);
			//
			//reposiciona o layer
			//
			$indicel = $novolayer->index;
			$numlayers = $this->mapa->numlayers;
			$nummove = 0;
			for ($i = $numlayers-1;$i > 0;$i--)
			{
				$layerAbaixo = $this->mapa->getlayer($i);
				$tipo = $layerAbaixo->type;
				if (($tipo != 2) && ($tipo != 3))
				{$nummove++;}
			}
			if ($nummove > 2)
			{
				for ($i=0;$i<=($nummove - 3);++$i)
				{$this->mapa->movelayerup($indicel);}
			}
		}
		else
		{return("erro");}
		return("ok");
	}
/*
function: mapaRelatorioAnaliseDist

Gera um relat�rio da an�lise de distribui��o de pontos.

Executa script R para gerar relat�rio .

parameters:

$arqpt - Prefixo dos arquivos em disco com os pontos.

$dimx - Range em x no formato R c(-54,-53).

$dimy - Range em y no formato R c(-25,-23).

$dir_tmp - Diret�rio tempor�rio do mapserver.

$R_path - Onde fica o R.

$locaplic - Onde fica o I3Geo.
*/
	function mapaRelatorioAnaliseDist($arqpt,$dimx,$dimy,$dir_tmp,$R_path,$locaplic)
	{
		set_time_limit(180);
		$nomedir = dirname($arqpt)."/";
		$rcode[] = 'dadosx<-scan("'.$arqpt.'x")';
		$rcode[] = 'dadosy<-scan("'.$arqpt.'y")';
		$tipoimg = "bitmap";
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/win")';
			if(file_exists($locaplic.'/pacotes/rlib/win'))
			$rcode[] = $lib;
			$tipoimg = "png";
		}
		else
		{
			if(file_exists($locaplic."/pacotes/rlib/linux"))
			{
				$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/linux")';
				$rcode[] = $lib;
			}
		}		
		$rcode[] = 'library(spatstat)';
		$rcode[] = 'oppp <- ppp(dadosx, dadosy, '.$dimx.','.$dimy.')';
		$rcode[] = 'img<-distmap(oppp)';
		$rcode[] = 'zz <- file("'.$arqpt.'.htm", "w")';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br><b>Dist�ncia</b>\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = $tipoimg.'(file="'.$nomedir.'distancia.png")';
		$rcode[] = 'plot(img,main="")';
		$rcode[] = 'points(oppp$x,oppp$y,pch="x",col=1)';
		$rcode[] = 'dev.off()';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br></pre><img src=distancia.png />\n", file = zz)';
		$rcode[] = 'cat("<br>Resumo<pre>\n", file = zz)';
		$rcode[] = 'summary(img)';
		$rcode[] = 'cat("<br></pre>Quartis<pre>\n", file = zz)';
		$rcode[] = 'quantile.im(img)';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br>Histograma\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = $tipoimg.'(file="'.$nomedir.'histdistancia.png")';
		$rcode[] = 'hist.im(img,main="")';
		$rcode[] = 'points(oppp$x,oppp$y,pch="x",col=2)';
		$rcode[] = 'dev.off()';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br><img src=histdistancia.png />\n", file = zz)';
		$rcode[] = 'cat("<br></pre>Perspectiva\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = $tipoimg.'(file="'.$nomedir.'perspdistancia.png")';
		$rcode[] = 'p<-persp.im(img,colmap=terrain.colors(128),shade=0.3,theta=30,phi=45,main="")';
		$rcode[] = 'dev.off()';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br><img src=perspdistancia.png />\n", file = zz)';
		$rcode[] = 'cat("<br></pre>Contorno\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = $tipoimg.'(file="'.$nomedir.'contordistancia.png")';
		$rcode[] = 'contour.im(img,main="")';
		$rcode[] = 'points(oppp$x,oppp$y,pch="x",col=2)';
		$rcode[] = 'dev.off()';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br><img src=contordistancia.png />\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = 'img<-density.ppp(oppp)';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br><b>Densidade</b>\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = $tipoimg.'(file="'.$nomedir.'densidade.png")';
		$rcode[] = 'plot(img,main="")';
		$rcode[] = 'points(oppp$x,oppp$y,pch="x",col=2)';
		$rcode[] = 'dev.off()';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br></pre><img src=densidade.png />\n", file = zz)';
		$rcode[] = 'cat("<br>Resumo<pre>\n", file = zz)';
		$rcode[] = 'summary(img)';
		$rcode[] = 'cat("<br></pre>Quartis<pre>\n", file = zz)';
		$rcode[] = 'quantile.im(img)';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br>Histograma\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = $tipoimg.'(file="'.$nomedir.'histdensidade.png")';
		$rcode[] = 'hist.im(img,main="")';
		$rcode[] = 'dev.off()';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br><img src=histdensidade.png />\n", file = zz)';
		$rcode[] = 'cat("<br></pre>Perspectiva\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = $tipoimg.'(file="'.$nomedir.'perspdensidade.png")';
		$rcode[] = 'p<-persp.im(img,colmap=terrain.colors(128),shade=0.3,theta=30,phi=45,main="")';
		$rcode[] = 'dev.off()';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br><img src=perspdensidade.png />\n", file = zz)';
		$rcode[] = 'cat("<br></pre>Contorno\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = $tipoimg.'(file="'.$nomedir.'contordensidade.png")#,height =600, width = 600, res = 72)';
		$rcode[] = 'contour.im(img,main="")';
		$rcode[] = 'points(oppp$x,oppp$y,pch="x",col=2)';
		$rcode[] = 'dev.off()';
		$rcode[] = 'sink(zz)';
		$rcode[] = 'cat("<br><img src=contordensidade.png />\n", file = zz)';
		$rcode[] = 'sink()';
		$rcode[] = 'close(zz)';
		$r = executaR($rcode,$dir_tmp,$R_path);
	}
/*
function: mapaCluster

Gera um mapa de cluster.

Executa script R para gerar os dados.

parameters:
$arqpt - Prefixo dos arquivos em disco com os pontos.

$dimx - Range em x no formato R c(-54,-53).

$dimy - Range em y no formato R c(-25,-23).

$dir_tmp - Diret�rio tempor�rio do mapserver.

$R_path - Onde fica o R.

$locaplic - Onde fica o I3Geo.

$sigma - Bandwidth for kernel smoother in "smooth" option.
*/
	function mapaCluster($arqpt,$arqpt2,$dimx,$dimy,$dir_tmp,$R_path,$locaplic)
	{
		$gfile_name = nomeRandomico(20);
		$rcode[] = 'dadosx<-scan("'.$arqpt.'x")';
		$rcode[] = 'dadosy<-scan("'.$arqpt.'y")';
		$rcode[] = 'dadosx2<-scan("'.$arqpt2.'x")';
		$rcode[] = 'dadosy2<-scan("'.$arqpt2.'y")';
		$rcode[] = 'd1<-data.frame(cbind(dadosx,dadosy))';
		$rcode[] = 'names(d1)<-(c("x","y"))';
		$rcode[] = 'd2<-data.frame(cbind(dadosx2,dadosy2))';
		$rcode[] = 'names(d2)<-(c("col1","col2"))';
		$rcode[] = 'd2<-as.matrix.data.frame(d2)';
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/win")';
			if(file_exists($locaplic.'/pacotes/rlib/win'))
			$rcode[] = $lib;
		}
		else
		{
			if(file_exists($locaplic."/pacotes/rlib/linux"))
			{
				$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/linux")';
				$rcode[] = $lib;
			}
		}		
		$rcode[] = 'library(spatclus)';
		$rcode[] = 'RES <- clus(d1,d2,limx='.$dimx.',limy='.$dimy.',eps=0.2)';
		//var_dump($rcode);
		$r = executaR($rcode,$dir_tmp,$R_path,$gfile_name);
		return "ok";
	}

/*
function: mapaKernel

Gera um mapa de kernel.

Executa script R para gerar a imagem.

parameters:
$arqpt - Prefixo dos arquivos em disco com os pontos.

$dimx - Range em x no formato R c(-54,-53).

$dimy - Range em y no formato R c(-25,-23).

$dir_tmp - Diret�rio tempor�rio do mapserver.

$R_path - Onde fica o R.

$locaplic - Onde fica o I3Geo.

$sigma - Bandwidth for kernel smoother in "smooth" option.
*/
	function mapaKernel($arqpt,$dimx,$dimy,$dir_tmp,$R_path,$locaplic,$sigma="")
	{
		$gfile_name = nomeRandomico(20);
		$graf = "png";
		$rcode[] = 'dadosx<-scan("'.$arqpt.'x")';
		$rcode[] = 'dadosy<-scan("'.$arqpt.'y")';
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/win")';
			if(file_exists($locaplic.'/pacotes/rlib/win'))
			$rcode[] = $lib;
			$tipoimg = "png";
		}
		else
		{
			if(file_exists($locaplic."/pacotes/rlib/linux"))
			{
				$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/linux")';
				$rcode[] = $lib;
			}
		}		
		$rcode[] = 'library(spatstat)';
		$rcode[] = 'pt <- ppp(dadosx, dadosy, '.$dimx.','.$dimy.')';
		$rcode[] = 'img <- ksmooth.ppp(pt';
		if (is_numeric($sigma))
		{$rcode[] = ',sigma='.$sigma.')';}
		else
		{$rcode[] = ')';}
		$rcode[] = 'cat(img$v,file="'.$arqpt.'img",fill=FALSE)';
		$rcode[] = 'cat(img$xstep,file="'.$arqpt.'h",fill=TRUE)';
		$rcode[] = 'cat(img$ystep,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$rcode[] = 'cat(img$xrange,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$rcode[] = 'cat(img$yrange,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$rcode[] = 'cat(img$dim,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		//var_dump($rcode);
		$r = executaR($rcode,$dir_tmp,$R_path,$gfile_name);
		return "ok";
	}
/*
function: mapaDensidade

Gera um mapa de densidade de pontos.

Executa script R para gerar a imagem.

parameters:
$arqpt - Prefixo dos arquivos em disco com os pontos.

$dimx - Range em x no formato R c(-54,-53).

$dimy - Range em y no formato R c(-25,-23).

$dir_tmp - Diret�rio tempor�rio do mapserver.

$R_path - Onde fica o R.

$locaplic - Onde fica o I3Geo.
*/
	function mapaDensidade($arqpt,$dimx,$dimy,$dir_tmp,$R_path,$locaplic)
	{
		$gfile_name = nomeRandomico(20);
		$graf = "png";
		$rcode[] = 'dadosx<-scan("'.$arqpt.'x")';
		$rcode[] = 'dadosy<-scan("'.$arqpt.'y")';
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/win")';
			if(file_exists($locaplic.'/pacotes/rlib/win'))
			$rcode[] = $lib;
			$tipoimg = "png";
		}
		else
		{
			if(file_exists($locaplic."/pacotes/rlib/linux"))
			{
				$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/linux")';
				$rcode[] = $lib;
			}
		}		
		$rcode[] = 'library(spatstat)';
		$rcode[] = 'pt <- ppp(dadosx, dadosy, '.$dimx.','.$dimy.')';
		$rcode[] = 'img <- density.ppp(pt)';
		$rcode[] = 'cat(img$v,file="'.$arqpt.'img",fill=FALSE)';
		$rcode[] = 'cat(img$xstep,file="'.$arqpt.'h",fill=TRUE)';
		$rcode[] = 'cat(img$ystep,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$rcode[] = 'cat(img$xrange,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$rcode[] = 'cat(img$yrange,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$rcode[] = 'cat(img$dim,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$r = executaR($rcode,$dir_tmp,$R_path,$gfile_name);
		return "ok";
	}
/*
function: mapaDistancia

Gera um mapa de distancia de pontos.

Executa script R para gerar a imagem.

parameters:

$arqpt - Prefixo dos arquivos em disco com os pontos.

$dimx - Range em x no formato R c(-54,-53).

$dimy - Range em y no formato R c(-25,-23).

$dir_tmp - Diret�rio tempor�rio do mapserver.

$R_path - Onde fica o R.

$locaplic - Onde fica o I3Geo.
*/
	function mapaDistancia($arqpt,$dimx,$dimy,$dir_tmp,$R_path,$locaplic)
	{
		$gfile_name = nomeRandomico(20);
		$graf = "png";
		$rcode[] = 'dadosx<-scan("'.$arqpt.'x")';
		$rcode[] = 'dadosy<-scan("'.$arqpt.'y")';
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/win")';
			if(file_exists($locaplic.'/pacotes/rlib/win'))
			$rcode[] = $lib;
			$tipoimg = "png";
		}
		else
		{
			if(file_exists($locaplic."/pacotes/rlib/linux"))
			{
				$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/linux")';
				$rcode[] = $lib;
			}
		}		
		$rcode[] = 'library(spatstat)';
		$rcode[] = 'pt <- ppp(dadosx, dadosy, '.$dimx.','.$dimy.')';
		$rcode[] = 'img <- distmap(pt)';
		$rcode[] = 'cat(img$v,file="'.$arqpt.'img",fill=FALSE)';
		$rcode[] = 'cat(img$xstep,file="'.$arqpt.'h",fill=TRUE)';
		$rcode[] = 'cat(img$ystep,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$rcode[] = 'cat(img$xrange,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$rcode[] = 'cat(img$yrange,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$rcode[] = 'cat(img$dim,file="'.$arqpt.'h",append=TRUE,fill=TRUE)';
		$r = executaR($rcode,$dir_tmp,$R_path,$gfile_name);
		return "ok";
	}
/*
function: mapaDeldir

Calcula a triangula��o de Delaunay e diagrama de Voronoi.

Para funcionar, � necess�rio a instala��o da biblioteca deldir do R.

http://cran.r-project.org/web/packages/deldir

parameters:

$arqpt - Prefixo dos arquivos em disco com os pontos.

$dir_tmp - Diret�rio tempor�rio do mapserver.

$R_path - Onde fica o R.

$locaplic - Onde fica o I3Geo.
*/
	function mapaDeldir($arqpt,$dir_tmp,$R_path,$locaplic)
	{
		$gfile_name = nomeRandomico(20);
		$rcode[] = 'dadosx<-scan("'.$arqpt.'x")';
		$rcode[] = 'dadosy<-scan("'.$arqpt.'y")';
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{
			$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/win")';
			if(file_exists($locaplic.'/pacotes/rlib/win'))
			$rcode[] = $lib;
		}
		else
		{
			if(file_exists($locaplic."/pacotes/rlib/linux"))
			{
				$lib = '.libPaths("'.$locaplic.'/pacotes/rlib/linux")';
				$rcode[] = $lib;
			}
		}		
		$rcode[] = 'library(deldir)';
		$rcode[] = 'pt <- deldir(dadosx, dadosy)';
		$rcode[] = 'write.csv(pt$delsgs,file="'.$arqpt.'delsgs")';
		$rcode[] = 'write.csv(pt$dirsgs,file="'.$arqpt.'dirsgs")';
		$r = executaR($rcode,$dir_tmp,$R_path,$gfile_name);
		return "ok";
	}
/*
function deldirDel2shp

L� um arquivo CSV gerado pelo software R com os dados referentes � triangula��o de Delaunay.

O arquivo CSV � lido e convertido em um shape file que � ent�o adicionado ao mapa.

Parametros:

$nomearq - nome do arquivo CSV

$dir_tmp - diret�rio tempor�rio do Mapserver

$locaplic - diret�rio da aplica��o i3geo
*/
	function deldirDel2shp($nomearq,$dir_tmp,$locaplic)
	{
		if (file_exists($nomearq))
		{
  			if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
  			include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
  			else	
			include_once "../pacotes/phpxbase/api_conversion.php";
			//define o nome do novo shapefile que ser� criado
			$nomefinal = nomeRandomico();
			$nomeshp = $this->diretorio."/".$nomefinal;
			//cria o shape file
			$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_ARC);
			// cria o dbf
			$def[] = array("x1","N","12","5");
			$def[] = array("y1","N","12","5");
			$def[] = array("x2","N","12","5");
			$def[] = array("y2","N","12","5");
			$def[] = array("ind1","N","5","0");
			$def[] = array("ind2","N","5","0");
			if(!function_exists(dbase_create))
			{$db = xbase_create($nomeshp.".dbf", $def);}
			else
			{$db = dbase_create($nomeshp.".dbf", $def);}				
			$dbname = $nomeshp.".dbf";
			//le o arquivo linha a linha, pulando a primeira
			//acrescenta os pontos no shape file formando as linhas
			$abre = fopen($nomearq, "r");
			$buffer = fgets($abre);
			$poligonos = array();
			while (!feof($abre))
			{
				$buffer = fgets($abre);
				$i = explode(",",$buffer);
				if(is_array($i))
				{
					$i1 = floatval($i[1]);
					$i2 = floatval($i[2]);
					$i3 = floatval($i[3]);
					$i4 = floatval($i[4]);
					$i5 = floatval($i[5]);
					$i6 = floatval($i[6]);
					$poPoint1 = ms_newpointobj();
					$poPoint1->setXY($i1,$i2);
					$poPoint2 = ms_newpointobj();
					$poPoint2->setXY($i3, $i4);			
					$linha = ms_newLineObj();
					$linha->add($poPoint1);
					$linha->add($poPoint2);
					$ShapeObj = ms_newShapeObj(MS_SHAPE_LINE);
					$ShapeObj->add($linha);	
					$novoshpf->addShape($ShapeObj);
					$registro = array($i1,$i2,$i3,$i4,$i5,$i6);
					if(!function_exists(dbase_create))
					xbase_add_record($db,$registro);
					else
					dbase_add_record($db,$registro);
					$linha->free();
					$ShapeObj->free();
				}
			}
			$novoshpf->free();
			if(!function_exists(dbase_create))
			xbase_close($db);
			else
			dbase_close($db);
			fclose($abre);		
			//adiciona no mapa atual o novo tema
			$novolayer = criaLayer($this->mapa,MS_LAYER_LINE,MS_DEFAULT,("Delaunay (".$nomefinal.")"),$metaClasse="SIM");
			$novolayer->set("data",$nomeshp.".shp");
			$novolayer->setmetadata("DOWNLOAD","SIM");
			$novolayer->set("template","none.htm");
			$classe = $novolayer->getclass(0);
			$estilo = $classe->getstyle(0);
			$estilo->set("symbolname","linha");
			$estilo->set("size",2);
			$cor = $estilo->color;
			$cor->setrgb(255,50,0);
		}
	}
/*
function deldirDir2shp

L� um arquivo CSV gerado pelo software R com os dados referentes ao diagrama de Voronoi.

O arquivo CSV � lido e convertido em um shape file que � ent�o adicionado ao mapa.

Parametros:

$nomearq - nome do arquivo CSV

$dir_tmp - diret�rio tempor�rio do Mapserver

$locaplic - diret�rio da aplica��o i3geo
*/	
	function deldirDir2shp($nomearq,$dir_tmp,$locaplic)
	{
		if (file_exists($nomearq))
		{
  			if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
  			include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
  			else	
			include_once "../pacotes/phpxbase/api_conversion.php";
			//
			//define os nomes dos novos shapefiles que ser�o criados
			//
			$nomeLinhas = nomeRandomico();
			$nomePoligonos = nomeRandomico();
			$nomeshpLinhas = $this->diretorio."/".$nomeLinhas;
			$nomeshpPoligonos = $this->diretorio."/".$nomePoligonos;
			//cria o shape file
			$novoshpLinhas = ms_newShapefileObj($nomeshpLinhas, MS_SHP_ARC);
			$novoshpPoligonos = ms_newShapefileObj($nomeshpPoligonos, MS_SHP_POLYGON);
			//
			// cria o dbf para o shapefile linear
			//
			$def[] = array("x1","N","12","5");
			$def[] = array("y1","N","12","5");
			$def[] = array("x2","N","12","5");
			$def[] = array("y2","N","12","5");
			$def[] = array("ind1","N","5","0");
			$def[] = array("ind2","N","5","0");
			$def[] = array("b1","C","6");
			$def[] = array("b2","C","6");
			if(!function_exists(dbase_create))
			{$dbLinhas = xbase_create($nomeshpLinhas.".dbf", $def);}
			else
			{$dbLinhas = dbase_create($nomeshpLinhas.".dbf", $def);}				
			$dbnameLinhas = $nomeshpLinhas.".dbf";
			//
			// cria o dbf para o shapefile poligonal
			//
			$def = array();
			$def[] = array("area","N","12","5");
			if(!function_exists(dbase_create))
			{$dbPoligonos = xbase_create($nomeshpPoligonos.".dbf", $def);}
			else
			{$dbPoligonos = dbase_create($nomeshpPoligonos.".dbf", $def);}				
			$dbnamePoligonos = $nomeshpPoligonos.".dbf";
			//
			//constr�i as linhas do diagrama
			//			
			//le o arquivo linha a linha, pulando a primeira
			//acrescenta os pontos no shape file formando as linhas
			//cria o array para criar os pol�gonos
			//
			$abre = fopen($nomearq, "r");
			$buffer = fgets($abre);
			$borda = array();//guarda os pontos que ficam na borda
			$poligonos = array();
			while (!feof($abre))
			{
				$buffer = fgets($abre);
				$i = explode(",",$buffer);
				if(is_array($i))
				{
					$i1 = floatval($i[1]);
					$i2 = floatval($i[2]);
					$i3 = floatval($i[3]);
					$i4 = floatval($i[4]);
					$i5 = floatval($i[5]);
					$i6 = floatval($i[6]);
					$poPoint1 = ms_newpointobj();
					$poPoint1->setXY($i1,$i2);
					$poPoint2 = ms_newpointobj();
					$poPoint2->setXY($i3, $i4);
					if(trim($i[7]) == "TRUE")
					{$borda[] = $poPoint1;}
					if(trim($i[8]) == "TRUE")
					{$borda[] = $poPoint2;}	
					$linha = ms_newLineObj();
					$linha->add($poPoint1);
					$linha->add($poPoint2);
					if($poligonos[$i[5]])
					$poligonos[$i[5]] = array_merge(array($linha),$poligonos[$i[5]]);
					else
					$poligonos[$i[5]] = array($linha);
					if($poligonos[$i[6]])
					$poligonos[$i[6]] = array_merge(array($linha),$poligonos[$i[6]]);
					else
					$poligonos[$i[6]] = array($linha);
					$ShapeObj = ms_newShapeObj(MS_SHAPE_LINE);
					$ShapeObj->add($linha);
					$novoshpLinhas->addShape($ShapeObj);
					$registro = array($i1,$i2,$i3,$i4,$i5,$i6,$i[7],$i[8]);
					if(!function_exists(dbase_create))
					xbase_add_record($dbLinhas,$registro);
					else
					dbase_add_record($dbLinhas,$registro);
					$ShapeObj->free();
				}
			}
			//
			//adiciona os poligonos
			//
			foreach ($poligonos as $p)
			{
				$ShapeObjp = ms_newShapeObj(MS_SHAPE_LINE);
				foreach ($p as $o)
				{$ShapeObjp->add($o);}
				$ns = $ShapeObjp->convexhull();
				$novoshpPoligonos->addShape($ns);
				$registro = array($ns->getArea());
				if(!function_exists(dbase_create))
				xbase_add_record($dbPoligonos,$registro);
				else
				dbase_add_record($dbPoligonos,$registro);
				$ShapeObjp->free();	
			}
			$novoshpPoligonos->free();
			if(!function_exists(dbase_create))
			xbase_close($dbPoligonos);
			else
			dbase_close($dbPoligonos);
			//
			//adiciona o layer com os pol�gonos no mapa
			//
			$novolayerp = criaLayer($this->mapa,MS_LAYER_POLYGON,MS_DEFAULT,("Voronoi - poligonos (".$nomePoligonos.")"),$metaClasse="SIM");
			$novolayerp->set("data",$nomeshpPoligonos.".shp");
			$novolayerp->setmetadata("DOWNLOAD","SIM");
			$novolayerp->set("template","none.htm");
			$classe = $novolayerp->getclass(0);
			$estilo = $classe->getstyle(0);
			$cor = $estilo->color;
			$cor->setrgb(240,240,240);
			//
			//adiciona no mapa atual o novo tema com as linhas do diagrama
			//
			if (count($borda > 2))
			{
				$linha = ms_newLineObj();
				foreach ($borda as $ponto)
				{
					$linha->add($ponto);
				}
				$ShapeObj = ms_newShapeObj(MS_SHAPE_LINE);
				$ShapeObj->add($linha);
				$novoshpLinhas->addShape($ShapeObj->convexhull());
				$registro = array(0,0,0,0,0,0,0,0);
				if(!function_exists(dbase_create))
				xbase_add_record($dbLinhas,$registro);
				else
				dbase_add_record($dbLinhas,$registro);
				$linha->free();
				$ShapeObj->free();				
			}
			$novoshpLinhas->free();
			if(!function_exists(dbase_create))
			xbase_close($dbLinhas);
			else
			dbase_close($dbLinhas);
			fclose($abre);			
			$novolayer = criaLayer($this->mapa,MS_LAYER_LINE,MS_DEFAULT,("Voronoi (".$nomeLinhas.")"),$metaClasse="SIM");
			$novolayer->set("data",$nomeshpLinhas.".shp");
			$novolayer->setmetadata("DOWNLOAD","SIM");
			$novolayer->set("template","none.htm");
			$classe = $novolayer->getclass(0);
			$estilo = $classe->getstyle(0);
			$estilo->set("symbolname","linha");
			$estilo->set("size",4);
			$cor = $estilo->color;
			$cor->setrgb(255,210,0);
		}
	}
/*
function: pontoEmPoligono

Cruza um tema pontual com temas poligonais ou raster.

Salva o mapa acrescentando um novo layer com o resultado.

parameters:

$temaPt - Tema de pontos que ser� utilizado.

$temaPo - Temas poligonais separados por virgula.

$locaplic - Localiza��o do I3geo.
*/
	function pontoEmPoligono($temaPt,$temasPo,$locaplic)
	{
		set_time_limit(180);
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		$layerPt = $this->mapa->getlayerbyname($temaPt);
		$layerPt->set("template","none.htm");
		$layerPt->set("tolerance",0);
		//define o nome do novo shapefile que ser� criado
		$nomefinal = nomeRandomico();
		$nomeshp = $this->diretorio."/".$nomefinal;
		//pega os shapes selecionados
		$itemspt = pegaItens($layerPt);
		$existesel = "nao";
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		if ($layerPt->getNumresults() > 0){$existesel = "sim";}
		if ($existesel == "nao")
		{
			$layerPt->queryByrect($this->mapa->extent);
			//$qstring = "/.*/";
			//if($layerPt->connectiontype == MS_POSTGIS)
			//{$layerPt->queryByrect($this->mapa->extent);}
			//$qstring = $itemspt[0].' ~* \'^.\'  ';
			//else
			//{$layerPt->queryByAttributes($itemspt[0], $qstring, 1);}
		}
		$res_count = $layerPt->getNumresults();
		$pontos = array();
		//pega um shape especifico
		$sopen = $layerPt->open();
		if($sopen == MS_FAILURE){return "erro";}
		for ($i = 0; $i < $res_count; ++$i)
		{
			$result = $layerPt->getResult($i);
			$shp_index  = $result->shapeindex;
			$shape = $layerPt->getshape(-1, $shp_index);
			$pontos[] = $shape;
		}
		$layerPt->close();
		//gera o novo arquivo shape file
		// cria o shapefile
		$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POINT);
		// cria o dbf
		$def = array();
		foreach ($itemspt as $ni)
		{$def[] = array($ni,"C","254");}
		//pega os itens dos temas poligonais
		$layersPol = array();
		$temas = explode(",",$temasPo);
		foreach ($temas as $tema)
		{
			$l = $this->mapa->getlayerbyname($tema);
			$layers[] = $l;
		}
		$nomesitens = array(); //guarda os nomes dos temas e seus itens
		$conta = 0;
		foreach ($layers as $layer)
		{
			$items = pegaItens($layer);
			foreach ($items as $ni)
			{
				$def[] = array("I".$conta,"C","254");
				$nomesitens[] = "Tema: ".$layer->name.", Item: ".$ni." Novo: I".$conta."<br>";
				$conta = $conta + 1;
			}
		}
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);	
		foreach($pontos as $ponto)
		{
			$sopen = $layerPt->open();
			if($sopen == MS_FAILURE){return "erro";}
			foreach ($itemspt as $ni)
			{$reg[] = $ponto->values[$ni];}
			$layerPt->close();
			$novoshpf->addShape($ponto);
			$lineo = $ponto->line(0);
			$pt = $lineo->point(0);
			//faz a pesquisa
			foreach ($layers as $layer)
			{
				$layer->set("template","none.htm");
				$layer->set("toleranceunits",MS_PIXELS);
				$layer->set("tolerance",1);
				$ident = @$layer->queryByPoint($pt, 0, 0);
				$itens = pegaItens($layer);
				$res_count = $layer->getNumresults();
				$sopen = $layer->open();
				if($sopen == MS_FAILURE){return "erro";}
				if ($res_count > 0)
				{
					$result = $layer->getResult(0);
					$shp_index  = $result->shapeindex;
					$shape = $layer->getshape(-1, $shp_index);
					foreach ($itens as $item)
					{$reg[] = $shape->values[$item];}
				}
				else
				{
					foreach ($itens as $item)
					{$reg[] = "???";}
				}
				$layer->close();
			}
			xbase_add_record($db,$reg);
			$reg = array();
		}
		$novoshpf->free();
		xbase_close($db);
		$novolayer = ms_newLayerObj($this->mapa, $layerPt);
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->set("name",$nomefinal);
		$novolayer->setmetadata("TEMA","Cruzamento (".$nomefinal.")");
		$novolayer->setmetadata("TEMALOCAL","SIM");
		$novolayer->setmetadata("DOWNLOAD","SIM");
		$novolayer->setmetadata("ITENS"," ");
		$novolayer->setmetadata("ITENSDESC"," ");
		$novolayer->set("connectiontype",MS_SHAPEFILE);
		if (file_exists(($this->arquivo)."qy"))
		{unlink (($this->arquivo)."qy");}
		return(implode(" ",$nomesitens));
	}
/*
function: distanciaptpt

Calcula a distancia entre um ponto de origem e os pontos em um tema.

S�o considerados apenas os pontos dentro de um tema de overlay.

parameters:

temaorigem - nome do layer com o ponto de origem

temadestino - nome od tema com os pontos de destino

temaoverlay - tema que ser� utilizado para selecionar o tema de destino

locapli - endere�o da aplica��o i3geo

itemorigem - nome do item na tabela de atributos do tema de origem que ser� acrescentado ao tema que ser� criado

itemdestino - nome do item na tabela de atributos do tema de origem que ser� acrescentado ao tema que ser� criado

*/
function distanciaptpt($temaorigem,$temadestino,$temaoverlay,$locaplic,$itemorigem,$itemdestino)
{
	set_time_limit(180);
	//para manipular dbf
	if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
	include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
	else	
	include_once "../pacotes/phpxbase/api_conversion.php";
	//define o nome do novo shapefile que ser� criado
	$nomefinal = nomeRandomico();
	$nomeshp = $this->diretorio."/".$nomefinal;
	if (file_exists(($this->arquivo)."qy"))
	{$this->mapa->loadquery(($this->arquivo)."qy");}
	else
	{return "errox";}
	$layerorigem = $this->mapa->getlayerbyname($temaorigem);
	$layerdestino = $this->mapa->getlayerbyname($temadestino);
	$layeroverlay = $this->mapa->getlayerbyname($temaoverlay);
	$sopen = $layerorigem->open();
	if($sopen == MS_FAILURE){return "erro";}
	$res_count = $layerorigem->getNumresults();
	for ($i = 0; $i < $res_count; ++$i)
	{
		$result = $layerorigem->getResult($i);
		$shp_index  = $result->shapeindex;
		$shapesorigem[] = $layerorigem->getshape(-1, $shp_index);
	}
	$layerorigem->close();
	$layeroverlay->set("tolerance",0);
	$layerdestino->set("tolerance",0);
	$layeroverlay->queryByrect($this->mapa->extent);
	$layerdestino->queryByFeatures($layeroverlay->index);
	$sopen = $layerdestino->open();
	if($sopen == MS_FAILURE){return "erro";}
	$res_count = $layerdestino->getNumresults();
	for ($i = 0; $i < $res_count; ++$i)
	{
		$result = $layerdestino->getResult($i);
		$shp_index  = $result->shapeindex;
		$shapesdestino[] = $layerdestino->getshape(-1, $shp_index);
	}
	$layerdestino->close();
	$rect = $this->mapa->extent;
	$projInObj = $layerorigem->getProjection();
	if ($projInObj == "")
	{$projInObj = ms_newprojectionobj("proj=latlong");}
	$projOutObj = ms_newprojectionobj("proj=poly,ellps=GRS67,lat_0=".$rect->miny.",lon_0=".$rect->minx.",x_0=5000000,y_0=10000000");
	$origemdestino = array();
	if (count($shapesorigem)==0){return "erro";}
	if (count($shapesdestino)==0){return "erro";}
	$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_ARC);
	// cria o dbf
	$def[] = array("dist_m","N","10","2");
	$def[] = array("origem","C","255");
	$def[] = array("destino","C","255");
	if(!function_exists(dbase_create))
	{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
	else
	{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
	//acrescenta os pontos no novo shapefile
	$dbname = $nomeshp.".dbf";
	$db=xbase_open($dbname,2);
	foreach ($shapesorigem as $sorigem)
	{
		$valororigem = $sorigem->values[$itemorigem];
		foreach ($shapesdestino as $sdestino)
		{
			$linha = ms_newLineObj();
			$linha->add($sorigem->getCentroid());
			$linha->add($sdestino->getCentroid());
			$valordestino = $sdestino->values[$itemdestino];
			$ShapeObj = ms_newShapeObj(MS_SHAPE_LINE);
			$ShapeObj->add($linha);
			$novoshpf->addShape($ShapeObj);
			$ShapeObj->project($projInObj, $projOutObj);
			$distancia = $ShapeObj->getLength();
			$registro = array($distancia,$valororigem,$valordestino);
			xbase_add_record($db,$registro);
			$linha->free();
			$ShapeObj->free();
		}
	}
	$novoshpf->free();
	xbase_close($db);
	//adiciona no mapa atual o novo tema
	if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
	{$mapt = ms_newMapObj($locaplic."\\aplicmap\\novotema.map");}
	else
	{$mapt = ms_newMapObj($locaplic."/aplicmap/novotema.map");}
	$novolayer = criaLayer($this->mapa,MS_LAYER_LINE,MS_DEFAULT,("Distancias (".$nomefinal.")"),$metaClasse="SIM");
	$novolayer->set("data",$nomeshp.".shp");
	$novolayer->setmetadata("DOWNLOAD","SIM");
	$novolayer->set("template","none.htm");
	$classe = $novolayer->getclass(0);
	$estilo = $classe->getstyle(0);
	$estilo->set("symbolname","linha");
	$estilo->set("size",4);
	$cor = $estilo->color;
	$cor->setrgb(255,210,0);
	//limpa selecao
	//if (file_exists(($this->arquivo)."qy"))
	//{unlink (($this->arquivo)."qy");}
	return($nomeshp.".shp");	
}
/*
function: criaBuffer

Gera entorno (buffer) nos elementos selecionados de um tema.

Salva o mapa acrescentando um novo layer com o buffer.

Parametros:

$distancia - Dist�ncia em km.

$locaplic - Localiza��o do I3geo.

$unir - sim|nao indica se os elementos selecionados dever�o ser unidos em um s� antes do buffer ser criado

return:

nome do layer criado com o buffer.
*/
	function criaBuffer($distancia,$locaplic,$unir="nao")
	{
		if(!$this->layer){return "erro";}
		set_time_limit(180);
		//para manipular dbf
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		$nomebuffer = nomeRandomico();
		$nomeshp = $this->diretorio."/".$nomebuffer;
		//pega os shapes selecionados
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$sopen = $this->layer->open();
		if($sopen == MS_FAILURE){return "erro";}
		$items = pegaItens($this->layer);
		$this->layer->open();
		$res_count = $this->layer->getNumresults();
		$buffers = array();
		//pega um shape especifico
		for ($i = 0; $i < $res_count; ++$i)
		{
			$result = $this->layer->getResult($i);
			$shp_index  = $result->shapeindex;
			$shape = $this->layer->getshape(-1, $shp_index);
			//calcula a extens�o geografica
			$rect = $shape->bounds;
			$projInObj = ms_newprojectionobj("proj=latlong");
			$projOutObj = ms_newprojectionobj("proj=poly,ellps=GRS67,lat_0=".$rect->miny.",lon_0=".$rect->minx.",x_0=5000000,y_0=10000000");
			$poPoint = ms_newpointobj();
			$poPoint->setXY($rect->minx, $rect->miny);
			$dd1 = ms_newpointobj();
			$dd1->setXY($rect->minx, $rect->miny);
			$poPoint->project($projInObj, $projOutObj);
			$dd2 = ms_newpointobj();
			$dd2->setXY(($poPoint->x + $distancia), $poPoint->y);
			$dd2->project($projOutObj,$projInObj);
			$d = $dd1->distanceToPoint($dd2);
			if ($distancia < 0){$d = $d * -1;}
			//calcula a distancia 29100
			//gera o buffer
			$buffers[] = $shape->buffer($d);
			$shapes[] = $shape;
		}
		//faz a uni�o dos elementos se necess�rio
		if($unir == "sim")
		{
			$ns = $buffers[0];
			for($s=1;$s < count($buffers);$s++)
			{$ns = $ns->union_geos($buffers[$s]);}
			$buffers = array($ns);
			$shapes = array($shapes[0]);
		}		
		$fechou = $this->layer->close();
		//gera o novo arquivo shape file
		// cria o shapefile
		$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POLYGON);
		$items = pegaItens($this->layer);
		// cria o dbf
		$def = array();
		$def[] = array("i3geo","C","254");
		foreach ($items as $ni)
		{$def[] = array($ni,"C","254");}
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);
		for($i = 0;$i < count($buffers);++$i)
		{
			$reg[] = $i;
			foreach ($items as $ni)
			{$reg[] = $shapes[$i]->values[$ni];}
			$novoshpf->addShape($buffers[$i]);
			xbase_add_record($db,$reg);
			$reg = array();
		}
		$novoshpf->free();
		xbase_close($db);
		//adiciona no mapa atual o novo tema
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{$mapt = ms_newMapObj($locaplic."\\aplicmap\\novotema.map");}
		else
		{$mapt = ms_newMapObj($locaplic."/aplicmap/novotema.map");}
		$novolayer = criaLayer($this->mapa,MS_LAYER_POLYGON,MS_DEFAULT,("Buffer (".$nomebuffer.")"),$metaClasse="SIM");
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->setmetadata("DOWNLOAD","SIM");
		$novolayer->set("template","none.htm");
		$classe = $novolayer->getclass(0);
		$estilo = $classe->getstyle(0);
		$estilo->set("symbolname","p4");
		$estilo->set("size",5);		
		$cor = $estilo->color;
		$cor->setrgb(255,0,0);
		$coro = $estilo->outlinecolor;
		$coro->setrgb(255,0,0);
		return($novolayer->name);
	}
/*
function - criaCentroide

Gera centroide dos elementos selecionados de um tema.

Salva o mapa acrescentando um novo layer com os pontos.

Parametros:

$locaplic - Localiza��o do I3geo.
*/
	function criaCentroide($locaplic)
	{
		if(!$this->layer){return "erro";}
		set_time_limit(180);
		//para manipular dbf
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		$nomeCentroides = nomeRandomico();
		$nomeshp = $this->diretorio."/".$nomeCentroides;
		//pega os shapes selecionados
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$sopen = $this->layer->open();
		if($sopen == MS_FAILURE){return "erro";}
		$items = pegaItens($this->layer);
		$this->layer->open();
		$res_count = $this->layer->getNumresults();
		$centroides = array();
		$shapes = array();
		//pega um shape especifico
		for ($i = 0; $i < $res_count; ++$i)
		{
			$result = $this->layer->getResult($i);
			$shp_index  = $result->shapeindex;
			$shape = $this->layer->getshape(-1, $shp_index);
			$LineObj = ms_newLineObj();
			$LineObj->add($shape->getCentroid());
			$ShapeObj = ms_newShapeObj(MS_SHAPE_POINT);
			$ShapeObj->add($LineObj);
			$centroides[] = $ShapeObj;
			$shapes[] = $shape;
		}
		$fechou = $this->layer->close();
		//gera o novo arquivo shape file
		// cria o shapefile
		$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POINT);
		$items = pegaItens($this->layer);
		// cria o dbf
		$def = array();
		foreach ($items as $ni)
		{$def[] = array($ni,"C","254");}
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);
		for($i = 0;$i < count($centroides);++$i)
		{
			foreach ($items as $ni)
			{$reg[] = $shapes[$i]->values[$ni];}
			$novoshpf->addShape($centroides[$i]);
			xbase_add_record($db,$reg);
			$reg = array();
		}
		$novoshpf->free();
		xbase_close($db);
		//adiciona no mapa atual o novo tema
		if (strtoupper(substr(PHP_OS, 0, 3) == 'WIN'))
		{$mapt = ms_newMapObj($locaplic."\\aplicmap\\novotema.map");}
		else
		{$mapt = ms_newMapObj($locaplic."/aplicmap/novotema.map");}
		$novolayer = criaLayer($this->mapa,MS_LAYER_POINT,MS_DEFAULT,("Centr�ide (".$nomeCentroides.")"),$metaClasse="SIM");
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->setmetadata("DOWNLOAD","SIM");
		$novolayer->set("template","none.htm");
		$novolayer->setmetadata("TEMALOCAL","SIM");
		//limpa selecao
		if (file_exists(($this->arquivo)."qy"))
		{unlink (($this->arquivo)."qy");}
		return("ok");
	}
/*
function: gradeDePontos

Gera uma grade de pontos com espa�amento regular definido em d�cimos de grau.

Salva o mapa acrescentando um novo layer com a grade de coordenadas.

$ddx - Espa�amento em x.

$ddy - Espa�amento em y.

$px - X do primeiro ponto (superior esquerdo)

$py - Y do primeiro ponto.

$locaplic - Endere�o da aplica��o.

$nptx - N�mero de pontos em X (opcional)

$npty - N�mero de pontos em Y (opcional)
*/
	function gradeDePontos($xdd,$ydd,$px,$py,$locaplic,$nptx,$npty)
	{
		set_time_limit(180);
		//para manipular dbf
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		$nomegrade = nomeRandomico();
		$nomeshp = $this->diretorio."/".$nomegrade;
		$this->mapa->preparequery();
		$ext = $this->mapa->extent;
		$fx = $ext->maxx;
		$fy = $ext->miny;
		//calcula a dist�ncia entre os pontos em dd
		$distx = $fx - $px;
		$disty = $fy - $py;
		if ($distx < 0){$distx = $distx * -1;}
		if ($disty < 0){$disty = $disty * -1;}
		if ($nptx == "")
		{$nptx = round(($distx / $xdd),0);}
		if ($npty == "")
		{$npty = round(($disty / $ydd),0);}
		// cria o shapefile
		$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POINT);
		$def = array();
		$def[] = array("x","C","20");
		$def[] = array("y","C","20");
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);
		$reg = array();
		$w = $this->mapa->width;
		$h = $this->mapa->height;
		if ($h > $w)
		{
			$valorlinha = $py;
			for ($linha = 0; $linha < $npty; $linha++)
			{
				$y = $valorlinha;
				$valorcoluna = $px;
				for ($coluna = 0; $coluna < $nptx; $coluna++)
				{
					$x = $valorcoluna;
					$valorcoluna = $valorcoluna + $xdd;
					$poPoint = ms_newpointobj();
					$poPoint->setXY($x,$y);
					$novoshpf->addpoint($poPoint);
					$reg[] = $x;
					$reg[] = $y;
					xbase_add_record($db,$reg);
					$reg = array();
				}
				$valorlinha = $valorlinha - $ydd;
			}
		}
		else
		{
			$valorcoluna = $px;
			for ($coluna = 0; $coluna < $nptx; $coluna++)
			{
				$x = $valorcoluna;
				$valorlinha = $py;
				for ($linha = 0; $linha < $npty; $linha++)
				{
					$y = $valorlinha;
					$valorlinha = $valorlinha - $ydd;
					$poPoint = ms_newpointobj();
					$poPoint->setXY($x,$y);
					$novoshpf->addpoint($poPoint);
					$reg[] = $x;
					$reg[] = $y;
					xbase_add_record($db,$reg);
					$reg = array();
				}
				$valorcoluna = $valorcoluna + $xdd;
			}
		}
		$novoshpf->free();
		xbase_close($db);
		//adiciona o novo tema no mapa
		$novolayer = criaLayer($this->mapa,MS_LAYER_POINT,MS_DEFAULT,("Grade (".$nomegrade.")"),$metaClasse="SIM");
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->setmetadata("DOWNLOAD","SIM");
		$novolayer->setmetadata("TEMALOCAL","SIM");
		if (file_exists(($this->arquivo)."qy"))
		{unlink (($this->arquivo)."qy");}
		return("ok");
	}
/*
function: gradeDePol

Gera uma grade de pol�gonos com espa�amento regular definido em d�cimos de grau.

Salva o mapa acrescentando um novo layer com a grade.

parameters:

$xdd - Espa�amento em x.

$ydd - Espa�amento em y.

$x - X do primeiro ponto (superior esquerdo)

$y - Y do primeiro ponto.

$locaplic - Endere�o da aplica��o.

$nptx - N�mero de pontos em X (opcional)

$npty - N�mero de pontos em Y (opcional)
*/
	function gradeDePol($xdd,$ydd,$px,$py,$locaplic,$nptx,$npty)
	{
		set_time_limit(180);
		//para manipular dbf
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		$nomegrade = nomeRandomico();
		$nomeshp = $this->diretorio."/".$nomegrade;
		//pega a extens�o geogr�fica do mapa
		$this->mapa->preparequery();
		$ext = $this->mapa->extent;
		$fx = $ext->maxx;
		$fy = $ext->miny;
		//calcula a dist�ncia entre os pontos em dd
		$distx = $fx - $px;
		$disty = $fy - $py;
		if ($distx < 0){$distx = $distx * -1;}
		if ($disty < 0){$disty = $disty * -1;}
		if ($nptx == "")
		{$nptx = round(($distx / $xdd),0);}
		if ($npty == "")
		{$npty = round(($disty / $ydd),0);}
		// cria o shapefile
		$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POLYGON);
		$def = array();
		$def[] = array("id","C","20");
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);
		$reg = array();
		$w = $this->mapa->width;
		$h = $this->mapa->height;
		if ($h > $w)
		{
			$valorlinha = $py;
			for ($linha = 0; $linha < $npty; $linha++)
			{
				$y = $valorlinha;
				$valorcoluna = $px;
				for ($coluna = 0; $coluna < $nptx; $coluna++)
				{
					$x = $valorcoluna;
					$valorcoluna = $valorcoluna + $xdd;
					$poPoint1 = ms_newpointobj();
					$poPoint2 = ms_newpointobj();
					$poPoint3 = ms_newpointobj();
					$poPoint4 = ms_newpointobj();
					$poPoint1->setXY($x,$y);
					$poPoint2->setXY(($x + $xdd),$y);
					$poPoint3->setXY(($x + $xdd),($y - $ydd));
					$poPoint4->setXY($x,($y - $ydd));
					$linhas = ms_newLineObj();
					$linhas->add($poPoint1);
					$linhas->add($poPoint2);
					$linhas->add($poPoint3);
					$linhas->add($poPoint4);
					$linhas->add($poPoint1);
					$shapen = ms_newShapeObj(MS_SHP_POLYGON);
					$shapen->add($linhas);
					$novoshpf->addShape($shapen);
					$reg[] = $linha."-".$coluna;
					xbase_add_record($db,$reg);
					$reg = array();
				}
				$valorlinha = $valorlinha - $ydd;
			}
		}
		else
		{
			$valorcoluna = $px;
			for ($coluna = 0; $coluna < $nptx; $coluna++)
			{
				$x = $valorcoluna;
				$valorlinha = $py;
				for ($linha = 0; $linha < $npty; $linha++)
				{
					$y = $valorlinha;
					$valorlinha = $valorlinha - $ydd;
					$poPoint1 = ms_newpointobj();
					$poPoint2 = ms_newpointobj();
					$poPoint3 = ms_newpointobj();
					$poPoint4 = ms_newpointobj();
					$poPoint1->setXY($x,$y);
					$poPoint2->setXY(($x + $xdd),$y);
					$poPoint3->setXY(($x + $xdd),($y - $ydd));
					$poPoint4->setXY($x,($y - $ydd));
					$linhas = ms_newLineObj();
					$linhas->add($poPoint1);
					$linhas->add($poPoint2);
					$linhas->add($poPoint3);
					$linhas->add($poPoint4);
					$linhas->add($poPoint1);
					$shapen = ms_newShapeObj(MS_SHP_POLYGON);
					$shapen->add($linhas);
					$novoshpf->addShape($shapen);
					$reg[] = $linha."-".$coluna;
					xbase_add_record($db,$reg);
					$reg = array();
				}
			$valorcoluna = $valorcoluna + $xdd;
			}
		}
		$novoshpf->free();
		xbase_close($db);
		//adiciona o novo tema no mapa
		$novolayer = criaLayer($this->mapa,MS_LAYER_POLYGON,MS_DEFAULT,("Grade (".$nomegrade.")"),$metaClasse="SIM");
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->setmetadata("DOWNLOAD","SIM");
		$novolayer->setmetadata("TEMALOCAL","SIM");
		$novolayer->set("transparency","50");
		if (file_exists(($this->arquivo)."qy"))
		{unlink (($this->arquivo)."qy");}
		return("ok");
	}
/*
function: gradeDeHex

Gera uma grade de pol�gonos hexagonais definido em d�cimos de grau.

Salva o mapa acrescentando um novo layer com a grade.

parameters:
$xdd - Espa�amento em x.

$ydd - Espa�amento em y.

$px - X do primeiro ponto (superior esquerdo)

$py - Y do primeiro ponto.

$locaplic - Endere�o da aplica��o.

$nptx - N�mero de pontos em X (opcional)

$npty - N�mero de pontos em Y (opcional)
*/
	function gradeDeHex($xdd,$ydd,$px,$py,$locaplic,$nptx,$npty)
	{
		set_time_limit(180);
		//para manipular dbf
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		$nomegrade = nomeRandomico();
		$nomeshp = $this->diretorio."/".$nomegrade;
		//pega a extens�o geogr�fica do mapa
		$this->mapa->preparequery();
		$ext = $this->mapa->extent;
		$fx = $ext->maxx;
		$fy = $ext->miny;
		//calcula a dist�ncia entre os pontos em dd
		$distx = $fx - $px;
		$disty = $fy - $py;
		if ($distx < 0){$distx = $distx * -1;}
		if ($disty < 0){$disty = $disty * -1;}
		if ($nptx == "")
		{$nptx = round(($distx / $xdd),0);}
		if ($npty == "")
		{$npty = round(($disty / $ydd),0);}
		// cria o shapefile
		$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POLYGON);
		$def = array();
		$def[] = array("id","C","20");
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);
		$reg = array();
		$w = $this->mapa->width;
		$h = $this->mapa->height;
		if ($h > $w)
		{
			$valorlinha = $py;
			for ($linha = 0; $linha < $npty; $linha++)
			{
				$y = $valorlinha;
				$valorcoluna = $px;
				for ($coluna = 0; $coluna < $nptx; $coluna++)
				{
					$x = $valorcoluna;
					$valorcoluna = $valorcoluna + $xdd;
					$poPoint1 = ms_newpointobj();
					$poPoint2 = ms_newpointobj();
					$poPoint3 = ms_newpointobj();
					$poPoint4 = ms_newpointobj();
					$poPoint1->setXY($x,$y);
					$poPoint2->setXY(($x + $xdd),$y);
					$poPoint3->setXY(($x + $xdd),($y - $ydd));
					$poPoint4->setXY($x,($y - $ydd));
					$linhas = ms_newLineObj();
					$linhas->add($poPoint1);
					$linhas->add($poPoint2);
					$linhas->add($poPoint3);
					$linhas->add($poPoint4);
					$linhas->add($poPoint1);
					$shapen = ms_newShapeObj(MS_SHP_POLYGON);
					$shapen->add($linhas);
					$novoshpf->addShape($shapen);
					$reg[] = $linha."-".$coluna;
					xbase_add_record($db,$reg);
					$reg = array();
				}
				$valorlinha = $valorlinha - $ydd;
			}
		}
		else
		{
			$valorcoluna = $px;
			for ($coluna = 0; $coluna < $nptx; $coluna++)
			{
				$x = $valorcoluna;
				$valorlinha = $py;
				$par = true;
				for ($linha = 0; $linha < $npty; $linha++)
				{
					$y = $valorlinha;
					$valorlinha = $valorlinha - $ydd - ($ydd/2);
					$poPoint1 = ms_newpointobj();
					$poPoint2 = ms_newpointobj();
					$poPoint3 = ms_newpointobj();
					$poPoint4 = ms_newpointobj();
					$poPoint5 = ms_newpointobj();
					$poPoint6 = ms_newpointobj();
					$poPoint1->setXY($x,$y);
					$poPoint2->setXY(($x + ($xdd/2)),$y+($ydd/2));
					$poPoint3->setXY($x + $xdd,$y);
					$poPoint4->setXY($x + $xdd,$y - $ydd);
					$poPoint5->setXY(($x + ($xdd/2)),$y - $ydd - ($ydd/2));
					$poPoint6->setXY($x,$y - $ydd);
					$linhas = ms_newLineObj();
					$linhas->add($poPoint1);
					$linhas->add($poPoint2);
					$linhas->add($poPoint3);
					$linhas->add($poPoint4);
					$linhas->add($poPoint5);
					$linhas->add($poPoint6);
					$linhas->add($poPoint1);
					$shapen = ms_newShapeObj(MS_SHP_POLYGON);
					$shapen->add($linhas);
					$novoshpf->addShape($shapen);
					$reg[] = $linha."-".$coluna;
					xbase_add_record($db,$reg);
					$reg = array();
					if ($par)
					{$x=$x+($xdd/2);$par=false;}
					else
					{$x=$x-($xdd/2);$par=true;}
				}
				$valorcoluna = $valorcoluna + $xdd;
			}
		}
		$novoshpf->free();
		xbase_close($db);
		//adiciona o novo tema no mapa
		$novolayer = criaLayer($this->mapa,MS_LAYER_POLYGON,MS_DEFAULT,("Grade (".$nomegrade.")"),$metaClasse="SIM");
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->setmetadata("DOWNLOAD","SIM");
		$novolayer->setmetadata("TEMALOCAL","SIM");
		$novolayer->set("transparency","50");
		if (file_exists(($this->arquivo)."qy"))
		{unlink (($this->arquivo)."qy");}
		return("ok");
	}
/*
function: nptPol

Conta o n�mero de pontos em pol�gono cruzando dois temas.

Salva o mapa acrescentando um novo layer com o resultado.

parameters:
$temaPt - Tema de pontos.

$temaPo - Tema poligonal.

$locaplic - Localiza��o do I3geo
*/
	function nptPol($temaPt,$temaPo,$locaplic)
	{
		set_time_limit(180);
		//para manipular dbf
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		$layerPt = $this->mapa->getlayerbyname($temaPt);
		$layerPt->set("template","none.htm");
		$layerPt->set("tolerance",0);
		$layerPo = $this->mapa->getlayerbyname($temaPo);
		$layerPo->set("template","none.htm");
		//define o nome do novo shapefile que ser� criado
		$nomefinal = nomeRandomico();
		$nomeshp = $this->diretorio."/".$nomefinal;
		$itenspo = pegaItens($layerPo);
		$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POLYGON);
		// cria o dbf
		$def = array();
		foreach ($itenspo as $ni)
		{$def[] = array($ni,"C","254");}
		$def[] = array("npontos","N","10","0");
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);
		$sopen = $layerPo->open();
		if($sopen == MS_FAILURE){return "erro";}
		$layerPo->whichShapes($this->mapa->extent);
		while ($shape = $layerPo->nextShape())
		{
			$novoreg = array();
			foreach($itenspo as $ipo)
			{$novoreg[] = $shape->values[$ipo];}
			$layerPt->querybyshape($shape);
			$novoreg[] = $layerPt->getNumresults();
			$novoshpf->addShape($shape);
			xbase_add_record($db,$novoreg);
		}
		$novoshpf->free();
		xbase_close($db);
		//adiciona o novo tema no mapa
		$novolayer = criaLayer($this->mapa,MS_LAYER_POLYGON,MS_DEFAULT,"N pontos",$metaClasse="SIM");
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->setmetadata("DOWNLOAD","SIM");
		$novolayer->setmetadata("TEMALOCAL","SIM");
		$novolayer->set("transparency","80");
		if (file_exists(($this->arquivo)."qy"))
		{unlink (($this->arquivo)."qy");}
		return("ok");
	}
/*
Function: agrupaElementos

Agrupa elementos em um pol�gono.

Salva o mapa acrescentando um novo layer com o resultado.
*/
	function agrupaElementos($item,$locaplic)
	{
		if(!$this->layer){return "erro";}
		set_time_limit(180);
		//para manipular dbf
		if(!isset($item)){$item="";}
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		//define o nome do novo shapefile que ser� criado
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$sopen = $this->layer->open();
		if($sopen == MS_FAILURE){return "erro";}
		$res_count = $this->layer->getNumresults();
		//
		//pega os indices dos poligonos por classe de atributo
		//
		$indices = array();
		for ($i = 0; $i < $res_count; ++$i)
		{
			$result = $this->layer->getResult($i);
			$shp_index  = $result->shapeindex;
			$shape = $this->layer->getshape(-1, $shp_index);
			if($item != "")
			$valor = $shape->values[$item];
			else
			$valor = "nenhum";
			if(!isset($indices[$valor]))
			{
				$indices[$valor] = array($shp_index);
			}
			else
			$indices[$valor] = array_merge($indices[$valor],array($shp_index));
		}

		$dissolve=array();
		foreach($indices as $i)
		{
			foreach ($i as $indice)
			{
				$shape = $this->layer->getshape(-1, $indice);
				if($item != "")
				$valor = $shape->values[$item];
				else
				$valor = "nenhum";
				if (!isset($dissolve[$valor]))
				{$dissolve[$valor] = $shape;}
				else
				{
					$tipo = $shape1->type;
					if($tipo==2)
					{
						for($l=0;$l<($shape->numlines);$l++)
						{
							$shape1 = $dissolve[$valor];
							$linha = $shape->line($l);
							$shape1->add($linha);
						}
						$dissolve[$valor] = $shape1;
					}
					else
					{
						$dissolve[$valor] = $shape->union_geos($dissolve[$valor]);
					}
				}
			}
		}
		$this->layer->close();
		//
		//cria o novo shapefile
		//
		$nomefinal = nomeRandomico();
		$nomeshp = $this->diretorio."/".$nomefinal;
		$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POLYGON);
		// cria o dbf
		$def = array();
		if($item==""){$item="nenhum";}
		$def[] = array($item,"C","254");
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);
		$classes = array_keys($dissolve);
		foreach ($classes as $classe)
		{
			$novoshpf->addShape($dissolve[$classe]->convexhull());
			xbase_add_record($db,array($classe));
		}
		$novoshpf->free();
		xbase_close($db);
		//
		//adiciona o novo layer no mapa
		//	
		$n = pegaNome($this->layer);	
		$novolayer = criaLayer($this->mapa,MS_LAYER_POLYGON,MS_DEFAULT,("Agrupamento de ".$n),$metaClasse="SIM");
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->setmetadata("DOWNLOAD","SIM");
		$novolayer->setmetadata("TEMALOCAL","SIM");
		if (file_exists(($this->arquivo)."qy"))
		{unlink (($this->arquivo)."qy");}

		return("ok");
	}
	
/*
function: dissolvePoligono

Dissolve as bordas entre pol�gonos com o mesmo atributo.

Salva o mapa acrescentando um novo layer com o resultado.

$item - item utilizado para agregar os pol�gonos

$locaplic - Localiza��o do I3geo
*/
	function dissolvePoligono($item,$locaplic)
	{
		if(!$this->layer){return "erro";}
		set_time_limit(180);
		//para manipular dbf
		if(!isset($item)){$item="";}
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		//define o nome do novo shapefile que ser� criado
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		$sopen = $this->layer->open();
		if($sopen == MS_FAILURE){return "erro";}
		$res_count = $this->layer->getNumresults();
		//
		//pega os indices dos poligonos por classe de atributo
		//
		$indices = array();
		for ($i = 0; $i < $res_count; ++$i)
		{
			$result = $this->layer->getResult($i);
			$shp_index  = $result->shapeindex;
			$shape = $this->layer->getshape(-1, $shp_index);
			if($item != "")
			$valor = $shape->values[$item];
			else
			$valor = "nenhum";
			if(!isset($indices[$valor]))
			{
				$indices[$valor] = array($shp_index);
			}
			else
			$indices[$valor] = array_merge($indices[$valor],array($shp_index));
		}
		//var_dump($indices);
		//
		//faz o dissolve dos poligonos
		//
		$dissolve=array();
		foreach($indices as $i)
		{
			foreach ($i as $indice)
			{
				$shape = $this->layer->getshape(-1, $indice);
				if($item != "")
				$valor = $shape->values[$item];
				else
				$valor = "nenhum";
				if (!isset($dissolve[$valor]))
				{$dissolve[$valor] = $shape;}
				else
				{
					$dissolve[$valor] = $shape->union_geos($dissolve[$valor]);
				}
			}
		}
		$this->layer->close();
		//
		//cria o novo shapefile
		//
		$nomefinal = nomeRandomico();
		$nomeshp = $this->diretorio."/".$nomefinal;
		$novoshpf = ms_newShapefileObj($nomeshp, MS_SHP_POLYGON);
		// cria o dbf
		$def = array();
		if($item==""){$item="nenhum";}
		$def[] = array($item,"C","254");
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);
		$classes = array_keys($dissolve);
		foreach ($classes as $classe)
		{
			$novoshpf->addShape($dissolve[$classe]);
			xbase_add_record($db,array($classe));
		}
		$novoshpf->free();
		xbase_close($db);
		//
		//adiciona o novo layer no mapa
		//	
		$n = pegaNome($this->layer);	
		$novolayer = criaLayer($this->mapa,MS_LAYER_POLYGON,MS_DEFAULT,("Dissolve de ".$n),$metaClasse="SIM");
		$novolayer->set("data",$nomeshp.".shp");
		$novolayer->setmetadata("DOWNLOAD","SIM");
		$novolayer->setmetadata("TEMALOCAL","SIM");
		if (file_exists(($this->arquivo)."qy"))
		{unlink (($this->arquivo)."qy");}

		return("ok");
	}
/*
function: funcoesGeometrias

Fun��es de an�lise de geometrias da ferramenta Geometrias.

parameters:
$dir_tmp - Diret�rio tempor�rio do mapserver

$imgdir - Diret�rio das imagens do mapa atual

$lista - Arquivos com as geometrias

$operacao - Tipo de an�lise.
*/
	function funcoesGeometrias($dir_tmp,$imgdir,$lista,$operacao)
	{
		$lista = explode(",",$lista);
		$dir = $dir_tmp."/".$imgdir."/";
		$geometrias = array();
		$valoresoriginais = array();
		$calculo = array();
		foreach ($lista as $l)
		{
			$geos = &$this->unserializeGeo($dir.$l);
			//pega todas as geometrias
			foreach ($geos["dados"] as $geo)
			{
				$geometrias[] = ms_shapeObjFromWkt($geo["wkt"]);
				$valoresoriginais = array_merge($valoresoriginais,$geo["valores"]);
			}
		}	
		if (count($geometrias) == 1)
		{
			eval("\$nShape = \$geometrias[0]->".$operacao."();");
			$calculo[]["gwkt"] = $nShape->toWkt();
		}		
		if (count($geometrias) == 2)
		{
			eval("\$nShape = \$geometrias[0]->".$operacao."(\$geometrias[1]);");
			$calculo[]["gwkt"] = $nShape->toWkt();
		}
		if (count($geometrias) > 2)
		{
			$geoc = $geometrias[0];
			for($i=1;$i<count($geometrias);++$i)
			{
				eval("\$geoc = \$geoc->".$operacao."(\$geometrias[\$i]);");
			}
			$calculo[]["gwkt"] = $geoc->toWkt();
		}
		$nomegeo = "";
		if (count($calculo)>0)
		{
			$final["layer"] = $operacao." ".(implode(" ",$lista));
			$final["dados"][] = array("id"=>"0","wkt"=>($calculo[0]["gwkt"]),"valores"=>$valoresoriginais,"imagem"=>"");
			$nomegeo = $dir.(nomerandomico(10))."keo";
			$this->serializeGeo($nomegeo,$final);
			$ext = $this->mapa->extent;
			$minx = $ext->minx;
			$miny = $ext->miny;
			$maxx = $ext->maxx;
			$maxy = $ext->maxy;
			$h = $this->mapa->height;
			$w = $this->mapa->width;
			$nomelayer = $this->incmapageometrias($dir_tmp,$imgdir,basename($nomegeo));
			if ($nomelayer != "erro")
			{
				
				$nlayer = $this->mapa->getlayerbyname($nomelayer);
				$bounds = $nlayer->getExtent();
				$this->mapa->setsize(30,30);
				$sb = $this->mapa->scalebar;
				$statusoriginal = $sb->status;
				$sb->set("status",MS_OFF);
				$ext->setextent(($bounds->minx),($bounds->miny),($bounds->maxx),($bounds->maxy));
	 			$imagem = gravaImagemMapa($this->mapa);
				$this->mapa->setsize($w,$h);
				$ext->setextent($minx,$miny,$maxx,$maxy);			
				$nlayer->set("status",MS_DELETE);
				$sb->set("status",$statusoriginal);
				$this->salva();
				$final = array();
				$final["layer"] = $operacao." ".(implode(" ",$lista));
				$final["dados"][] = array("id"=>"0","wkt"=>($calculo[0]["gwkt"]),"valores"=>$valoresoriginais,"imagem"=>($imagem["url"]));
				$this->serializeGeo($nomegeo,$final);
			}
		}
		return($nomegeo);	
	}
	
/*
function: calculaGeometrias

Fun��es de c�lculo de geometrias da ferramenta Geometrias.

parameters:
$dir_tmp - Diret�rio tempor�rio do mapserver

$imgdir - Diret�rio das imagens do mapa atual

$lista - Arquivos com as geometrias

$operacao - Tipo de an�lise.
*/
	function calculaGeometrias($dir_tmp,$imgdir,$lista,$operacao,$postgis_con,$srid_area)
	{
		//error_reporting(E_ALL);
		$lista = explode(",",$lista);
		$dir = $dir_tmp."/".$imgdir."/";
		foreach ($lista as $l)
		{
			$geos = &$this->unserializeGeo($dir.$l);
			//
			//verifica a vers�o do mapserver
			//se for anterior a 5, utiliza a conex�o com o postgis para fazer o processamento dos daods
			//
            $v = versao();
			if (($v["principal"] != 5) && ($postgis_con == ""))
			{return ("erro. Nao foi definida a conexao com o Postgis.");}
			if ($v["principal"] != 5)
			{
				$pgconn = pg_connect($postgis_con);
				foreach ($geos["dados"] as &$geo)
				{
					$g = $geo["wkt"];
					switch ($operacao)
					{
						case "perimetro":
							$sql = "select perimeter(transform( GeomFromText('$g',4291),$srid_area))::float as perim";
							$result=pg_query($pgconn, $sql);
							pg_close($pgconn);	
							$calculo = pg_fetch_all($result);
							$geo["valores"][] = array("item"=>"P_perim_metros","valor"=>$calculo[0]["perim"]);
						break;
						case "area":
							$sql = "select area(transform( GeomFromText('$g',4291),$srid_area))::float as aream";
							$result=pg_query($pgconn, $sql);
							pg_close($pgconn);	
							$calculo = pg_fetch_all($result);
							$geo["valores"][] = array("item"=>"P_area_metros","valor"=>$calculo[0]["aream"]);
						break;
						case "comprimento":
							$sql = "select length(transform( GeomFromText('$g',4291),$srid_area))::float as compm";
							$result=pg_query($pgconn, $sql);
							pg_close($pgconn);	
							$calculo = pg_fetch_all($result);
							$geo["valores"][] = array("item"=>"P_compr_metros","valor"=>$calculo[0]["compm"]);	
						break;
					}
				}
			}
			else
			{
				foreach ($geos["dados"] as &$geo)
				{
					$g = $geo["wkt"];
					switch ($operacao)
					{
						case "perimetro":
							$shape = ms_shapeObjFromWkt($g);
							$rect = $shape->bounds;
							$projInObj = ms_newprojectionobj("proj=latlong");
							$projOutObj = ms_newprojectionobj("proj=poly,ellps=GRS67,lat_0=".$rect->miny.",lon_0=".$rect->minx.",x_0=5000000,y_0=10000000,units=m");
							$shape->project($projInObj, $projOutObj);
							$s = $shape->towkt();
							$shape = ms_shapeObjFromWkt($s);
							$area = $shape->getLength();
							$geo["valores"][] = array("item"=>"P_perim_metros","valor"=>$area);
						break;
						case "area":
							$shape = ms_shapeObjFromWkt($g);
							$rect = $shape->bounds;
							$projInObj = ms_newprojectionobj("proj=latlong");
							$projOutObj = ms_newprojectionobj("proj=laea,lat_0=".$rect->miny.",lon_0=".$rect->minx.",x_0=500000,y_0=10000000,ellps=GRS67,units=m,no_defs");					
							$shape->project($projInObj, $projOutObj);
							$s = $shape->towkt();
							$shape = ms_shapeObjFromWkt($s);
							$area = $shape->getArea();
							$geo["valores"][] = array("item"=>"P_area_metros","valor"=>$area);
						break;
						case "comprimento":
						break;
					}
				}
			}
			$this->serializeGeo($dir.$l,$geos);
		}
		return("ok");	
	}
/*
function: incmapageometrias

Insere geometrias como tema no mapa.

parameters:
$dir_tmp - Diret�rio tempor�rio do mapserver

$imgdir - Diret�rio das imagens do mapa atual

$lista - Nomes, sem o caminho, dos arquivos com as geometrias, separados por v�rgula.

$operacao - Tipo de an�lise.

*/
	function incmapageometrias($dir_tmp,$imgdir,$lista)
	{
		$lista = explode(",",$lista);
		$dir = $dir_tmp."/".$imgdir."/";
		//if ($postgis_con == "")
		//{return ("erro. Nao foi definida a conexao com o Postgis.");}
		$shapes = array();
		$valoresoriginais = array();
		foreach ($lista as $l)
		{
			$geos = &$this->unserializeGeo($dir.$l);
			//pega todas as geometrias
			foreach ($geos["dados"] as $geo)
			{
				//echo $geo["wkt"]."<br>";
				$shapes[] = ms_shapeObjFromWkt(str_replace("'","",$geo["wkt"]));
				foreach ($geo["valores"] as $v)
				{$valorestemp[] = $v["item"]."=".$v["valor"];}
				$valoresoriginais[] = implode(" ",$valorestemp);
			}
		}
		//verifica o tipo
		if (count($shapes) == 0){return("erro.");}
		$tiposhape = $shapes[0]->type;
		$tiposhapefile = MS_SHP_POLYGON;
		if ($tiposhape == 0){$tiposhapefile = MS_SHP_MULTIPOINT;}
		if ($tiposhape == 1){$tiposhapefile = MS_SHP_ARC;}
		//cria o shapefile
		if(file_exists($this->locaplic."/pacotes/phpxbase/api_conversion.php"))
		include_once($this->locaplic."/pacotes/phpxbase/api_conversion.php");
		else	
		include_once "../pacotes/phpxbase/api_conversion.php";
		$diretorio = dirname($this->arquivo);
		$novonomelayer = nomeRandomico();
		$nomeshp = $diretorio."/".$novonomelayer;
		$l = criaLayer($this->mapa,$tiposhape,MS_DEFAULT,"Ins","SIM");
		$novoshpf = ms_newShapefileObj($nomeshp, $tiposhapefile);
		$def[] = array("ID","C","250");
		if(!function_exists(dbase_create))
		{$db = xbase_create($nomeshp.".dbf", $def);xbase_close($db);}
		else
		{$db = dbase_create($nomeshp.".dbf", $def);dbase_close($db);}
		//acrescenta os pontos no novo shapefile
		$dbname = $nomeshp.".dbf";
		$db=xbase_open($dbname,2);
		$conta = 0;
		foreach ($shapes as $s)
		{
			$reg = array();
			$reg[] = $valoresoriginais[$conta];
			xbase_add_record($db,$reg);
			$novoshpf->addshape($s);
			$conta = $conta + 1;
		}
		xbase_close($db);
		$novoshpf->free();
		$l->setmetadata("tema",$novonomelayer." geometria");
		$l->setmetadata("TEMALOCAL","SIM");
		$l->setmetadata("DOWNLOAD","sim");
		$l->set("data",$nomeshp);
		$l->set("name",$novonomelayer);
		$classe = $l->getclass(0);
		$estilo = $classe->getstyle(0);
		if ($tiposhape == 0)
		{
			$estilo->set("symbolname","ponto");
			$estilo->set("size",6);
		}
		$cor = $estilo->color;
		$cor->setrgb(255,210,0);
		$cor = $estilo->outlinecolor;
		$cor->setrgb(255,0,0);
		$this->salva();
		return($novonomelayer);
	}
/*
function: gravaCoordenadasPt

L� as coordenadas de um tema pontual e grava em arquivos.

Essa fun��o � utilizada nas op��es que utilizam o R para c�lculos e necessitam ler as coordenadas dos pontos.

Parametros:

tema - nome do tema com os pontos

limitepontos - FALSE para considerar a extens�o geogr�fica do mapa atual e TRUE para considerar como limite as ocorr�ncias pontuais do tema

extendelimite - percentual utilizado para extender o limite da �rea resultante

return:

array com as dimens�es em x e y e nome dos arquivos com x e y gerados.
*/
function gravaCoordenadasPt($tema,$limitepontos="TRUE",$extendelimite)
{
		$prjMapa = $this->mapa->getProjection();
		$layerPt = $this->mapa->getlayerbyname($tema);
		$prjTema = $layerPt->getProjection();
		$layerPt->set("tolerance",0);
		$layerPt->set("template","none.htm");
		$nomefinal = nomeRandomico();
		$nomearq = $this->diretorio."/".$nomefinal;
		$itemspt = pegaItens($layerPt);
		$existesel = "nao";
		if (file_exists(($this->arquivo)."qy"))
		{$this->mapa->loadquery(($this->arquivo)."qy");}
		if ($layerPt->getNumresults() > 0){$existesel = "sim";}
		if ($existesel == "nao")
		{$layerPt->queryByrect($this->mapa->extent);}
		$res_count = $layerPt->getNumresults();
		$pontos = array();
		//pega um shape especifico
		$sopen = $layerPt->open();
		if($sopen == MS_FAILURE){return "erro";}

		if (($prjTema != "") && ($prjMapa != $prjTema))
		{
			$projInObj = ms_newprojectionobj($prjTema);
			$projOutObj = ms_newprojectionobj($prjMapa);		
		}
		for ($i = 0; $i < $res_count; ++$i)
		{
			$result = $layerPt->getResult($i);
			$shp_index  = $result->shapeindex;
			$shape = $layerPt->getshape(-1, $shp_index);
			$lineo = $shape->line(0);
			$pt = $lineo->point(0);
			if (($prjTema != "") && ($prjMapa != $prjTema))
			{
				$pt->project($projInObj, $projOutObj);
			}		
			$pontos[] = $pt->x."  ".$pt->y."\n";
			$pontosx[] = $pt->x;
			$pontosy[] = $pt->y;
		}
		$layerPt->close();
		//grava o arquivo com os pontos em x
		$f = fopen($nomearq."x","w");
		foreach ($pontosx as $pt)
		{fwrite($f,$pt."\n");}
		fclose($f);
		//grava o arquivo com os pontos em y
		$f = fopen($nomearq."y","w");
		foreach ($pontosy as $pt)
		{fwrite($f,$pt."\n");}
		fclose($f);
		if ($limitepontos == "TRUE")
		{
			$xi = (min($pontosx));
			$xf = (max($pontosx));
			$yi = (min($pontosy));
			$yf = (max($pontosy));
		}
		else
		{
			$ext = $this->mapa->extent;
			$xi = $ext->minx;
			$xf = $ext->maxx;
			$yi = $ext->miny;
			$yf = $ext->maxy;
		}
		if($extendelimite > 0)
		{
			$dx = $xf - $xi;
			$dy = $yf - $yi;
			$maisx = ($dx * $extendelimite) / 100;
			$maisy = ($dy * $extendelimite) / 100;
			$xi = $xi - $maisx;
			$xf = $xf + $maisx;
			$yi = $yi - $maisy;
			$yf = $yf + $maisy;
		}
		$dimx = "c(".$xi.",".$xf.")";
		$dimy = "c(".$yi.",".$yf.")";
		return array("dimx"=>$dimx,"dimy"=>$dimy,"arqx"=>($nomearq."x"),"arqy"=>($nomearq."y"),"prefixoarquivo"=>$nomearq);
}		
/*
function unserializeGeo

Deserializa um arquivo de geometrias.

Parametros:
$arquivo - arquivo que ser� processado
*/ 	 	
	public function unserializeGeo($arq)
	{
		$handle = fopen ($arq, "r");
		$conteudo = fread ($handle, filesize ($arq));
		fclose ($handle);
		return(unserialize($conteudo));
	}
/*
function serializeGeo

Deserializa um arquivo de geometrias.

Parametros:
$arquivo - arquivo que ser� processado

$geos - array com os dados
*/ 	 	
	public function serializeGeo($arq,$geos)
	{
		if (file_exists($arq))
		{unlink($arq);}
		$fp = fopen($arq,"w");
		$r = serialize($geos);
		fwrite($fp,$r);
		fclose($fp);
	}
}
?>
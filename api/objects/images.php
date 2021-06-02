<?php
class Images {

    // Connection
    private $conn;

    // Table
    private $db_table = "Images";

    // Columns
    public $type;

    // Db connection
//    public function __construct($db){
//        $this->conn = $db;
//    }
    public function __construct(){
    }

    // GET ALL
    public function getImagesFromFolder(){
        if ($this->type === null) return null;

        $url = '../../img/'.$this->type;
        $relurl = 'img/'.$this->type.'/';
        $imagearray = [];

        if ($handle = opendir($url)) {
            while (($file = readdir($handle)) !== false) {
                if ($file !== '.' && $file !== '..') {
                    $ext = substr($file, strrpos($file, '.') + 1);
                    if(in_array($ext, array("webp")))
                        $imagearray[] = array(
                            "root" => $file,
                            "lg" => $relurl.'lg/'.preg_replace('/\\.[^.\\s]{3,4}$/', '', $file).'-lg.jpg',
                            "md" => $relurl.'md/'.preg_replace('/\\.[^.\\s]{3,4}$/', '', $file).'-md.jpg',
                            "sm" => $relurl.'sm/'.preg_replace('/\\.[^.\\s]{3,4}$/', '', $file).'-sm.jpg',
                            "thumb" => $relurl.'thumb/'.preg_replace('/\\.[^.\\s]{3,4}$/', '', $file).'-thumb.jpg'
                        );
                }
            }
            closedir($handle);
        }

        return $imagearray;
    }

}

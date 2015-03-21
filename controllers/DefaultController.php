<?php

class DefaultController extends CiiDashboardController
{
	/**
     * Specifies the access control rules.
     * @return array
     */
    public function accessRules()
    {   
        return array(
            array('allow',
            	'actions' => array('index'),
            	'users' => array('@'),
            	'expression' => 'UserRoles::model()->hasPermission("manage", Yii::app()->user->role)'
            ),
            array('deny') 
        );  
    }
    
    public function actionIndex()
    {
    	$this->layout = 'dashboard';
        $this->render('index');
    }
}

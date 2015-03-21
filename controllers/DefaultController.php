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
            	'actions' => array('index', 'error'),
            	'users' => array('@'),
            	'expression' => 'UserRoles::model()->hasPermission("manage", Yii::app()->user->role)',
                'deniedCallback' => array($this, 'error')
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

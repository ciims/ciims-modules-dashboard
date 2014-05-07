<?php

class UsersController extends CiiDashboardController
{
	public $layout = 'settings';

	public function actionIndex()
	{
		$model=new Users('search');
		$model->unsetAttributes();
		if(isset($_GET['Users']))
			$model->attributes=$_GET['Users'];

		$model->pageSize = 25;

		$this->render('index', array('model' => $model));
	}
}
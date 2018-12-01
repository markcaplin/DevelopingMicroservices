using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Utilities
{
    public static class SerializationFunction<T>
    {
		/// <summary>
		/// Return String From Object
		/// </summary>
		/// <param name="entity"></param>
		/// <returns></returns>
		public static string ReturnStringFromObject(T entity)
		{
			string output = JsonConvert.SerializeObject(entity);
			return output;
		}
		/// <summary>
		/// Return Object From String
		/// </summary>
		/// <param name="entity"></param>
		/// <returns></returns>
		public static T ReturnObjectFromString(string entity)
		{
			T output = JsonConvert.DeserializeObject<T>(entity);
			return output;
		}

	}
}
